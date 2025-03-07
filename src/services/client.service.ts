import { RabbitMQService } from './../infra/messaging/rabbitmq.messaging';
import { injectable } from 'inversify';
import { ClientRepository } from '../infra/database/repositories/client.repository';
import { ClientEntity } from '../domain/entities/client.entity';
import { HttpException } from '../utils/exceptions';
import { CreateClientDto, UpdateClientDto } from '../utils/dtos';
import { IClientDocument } from '../infra/database/models/client.model';

@injectable()
export class ClientService {
  constructor(private readonly clientRepo: ClientRepository) {}

  async create(dto: CreateClientDto): Promise<IClientDocument> {
    const existingClient = await this.clientRepo.getByEmail(dto.email);

    if (existingClient)
      throw new HttpException(
        'This email is already associated with a client. Please use a different one.',
        409
      );

    const response = await this.clientRepo.create(dto);

    if (response._id) {
      const rabbitMq: RabbitMQService = await RabbitMQService.getInstance();
      await rabbitMq.sendMessage('validate-client-queue', {
        clientId: response._id,
      });
    }

    return response;
  }

  async update(dto: UpdateClientDto): Promise<IClientDocument | null> {
    const client = await this.findOne(dto.id);

    if (dto.email) {
      const existingClient = await this.clientRepo.getByEmail(dto.email);

      if (existingClient && existingClient.id !== client.id) {
        throw new HttpException(
          'This email is already associated with another client. Please use a different one.',
          409
        );
      }
    }

    return this.clientRepo.updateOne(dto.id, dto);
  }

  async findOne(id: string): Promise<IClientDocument> {
    const client = await this.clientRepo.getOne(id);

    if (!client)
      throw new HttpException(`Client not found with this ID: ${id}.`, 404);

    return client;
  }

  findAll(): Promise<IClientDocument[] | null> {
    return this.clientRepo.getAll();
  }
}

export async function validateClient(clientId: string): Promise<void> {
  console.log(`🔍 Validating client with ID: ${clientId}`);

  const clientRepository = new ClientRepository();

  const updatedClient = await clientRepository.updateOne(clientId, {
    validated: true,
  });

  if (!updatedClient) {
    throw new Error(`Client with ID ${clientId} not found.`);
  }

  console.log(`✅ Client ${clientId} validated in MongoDB.`);
}
