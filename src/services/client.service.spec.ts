import { ClientService } from './client.service';
import { ClientRepository } from '../infra/database/repositories/client.repository';
import { RabbitMQService } from '../infra/messaging/rabbitmq.messaging';
import { CreateClientDto, UpdateClientDto } from '../utils/dtos';

jest.mock('../infra/database/repositories/client.repository');
jest.mock('../infra/messaging/rabbitmq.messaging');

describe('ClientService', () => {
  let clientService: ClientService;
  let clientRepoMock: jest.Mocked<ClientRepository>;
  let rabbitMqMock: jest.Mocked<RabbitMQService>;

  beforeEach(() => {
    clientRepoMock = new ClientRepository() as jest.Mocked<ClientRepository>;
    rabbitMqMock = new RabbitMQService() as jest.Mocked<RabbitMQService>;
    clientService = new ClientService(clientRepoMock);
  });

  it('should return the client when found', async () => {
    const clientId = '123';
    const mockClient: any = {
      _id: clientId,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      createdAt: new Date('2025-03-07T13:58:24.165Z'),
      updatedAt: new Date('2025-03-07T13:58:24.165Z'),
      validated: false,
    };

    clientRepoMock.getOne.mockResolvedValue(mockClient);

    const result = await clientService.findOne(clientId);

    expect(result).toEqual(mockClient);

    expect(clientRepoMock.getOne).toHaveBeenCalledWith(clientId);
    expect(clientRepoMock.getOne).toHaveBeenCalledTimes(1);
  });

  it('should return all clients when found', async () => {
    const mockClients: any[] = [
      {
        _id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123456789',
        createdAt: new Date('2025-03-07T13:58:24.165Z'),
        updatedAt: new Date('2025-03-07T13:58:24.165Z'),
        validated: false,
      },
      {
        _id: '124',
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '987654321',
        createdAt: new Date('2025-03-07T13:58:24.165Z'),
        updatedAt: new Date('2025-03-07T13:58:24.165Z'),
        validated: true,
      },
    ];

    clientRepoMock.getAll.mockResolvedValue(mockClients);

    const result = await clientService.findAll();

    expect(result).toEqual(mockClients);

    expect(clientRepoMock.getAll).toHaveBeenCalledTimes(1);
  });

  it('should update the client and return the updated client', async () => {
    const clientId = '123';
    const updateDto: UpdateClientDto = {
      id: clientId,
      name: 'John Doe Updated',
      email: 'john_updated@example.com',
      phone: '123456789',
    };

    const mockClient: any = {
      _id: clientId,
      name: 'John Doe Updated',
      email: 'john_updated@example.com',
      phone: '123456789',
      createdAt: new Date('2025-03-07T13:58:24.165Z'),
      updatedAt: new Date('2025-03-07T13:58:24.165Z'),
      validated: true,
    };

    clientRepoMock.getOne.mockResolvedValue(mockClient);
    clientRepoMock.updateOne.mockResolvedValue(mockClient);

    const result = await clientService.update(updateDto);

    expect(result).toEqual(mockClient);

    expect(clientRepoMock.getOne).toHaveBeenCalledWith(clientId);
    expect(clientRepoMock.updateOne).toHaveBeenCalledWith(clientId, updateDto);
    expect(clientRepoMock.getOne).toHaveBeenCalledTimes(1);
    expect(clientRepoMock.updateOne).toHaveBeenCalledTimes(1);
  });

  it('should create a client and send a message to RabbitMQ', async () => {
    const createClientDto: CreateClientDto = {
      email: 'test@example.com',
      name: 'Test Client',
      phone: '',
    };

    const createdClient: any = {
      _id: '12345',
      ...createClientDto,
    };

    clientRepoMock.getByEmail.mockResolvedValue(null);

    clientRepoMock.create.mockResolvedValue(createdClient);

    const sendMessageMock = jest.fn().mockResolvedValue(undefined);
    rabbitMqMock.sendMessage = sendMessageMock;

    jest.spyOn(RabbitMQService, 'getInstance').mockResolvedValue(rabbitMqMock);

    const result = await clientService.create(createClientDto);

    expect(result).toEqual(createdClient);

    expect(clientRepoMock.getByEmail).toHaveBeenCalledWith(
      createClientDto.email
    );
    expect(clientRepoMock.getByEmail).toHaveBeenCalledTimes(1);
    expect(clientRepoMock.create).toHaveBeenCalledWith(createClientDto);
    expect(clientRepoMock.create).toHaveBeenCalledTimes(1);

    expect(sendMessageMock).toHaveBeenCalledWith('validate-client-queue', {
      clientId: createdClient._id,
    });
    expect(sendMessageMock).toHaveBeenCalledTimes(1);
  });
});
