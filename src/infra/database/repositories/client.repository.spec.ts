import { ClientRepository } from './client.repository';
import { IClientDocument } from '../models/client.model';
import { mock, instance, when, verify } from 'ts-mockito';

describe('ClientRepository', () => {
  let clientRepository: ClientRepository;
  let clientRepositoryMock: ClientRepository;

  beforeEach(() => {
    clientRepositoryMock = mock(ClientRepository);
    clientRepository = instance(clientRepositoryMock);
  });

  it('should return a client by email', async () => {
    const email = 'test@example.com';
    const mockClient: any = {
      _id: '12345',
      email: email,
      name: 'Test Client',
      phone: '123456789',
      createdAt: new Date(),
      updatedAt: new Date(),
      validated: false,
    };

    when(clientRepositoryMock.getByEmail(email)).thenResolve(mockClient);

    const result = await clientRepository.getByEmail(email);

    expect(result).toEqual(mockClient);
    verify(clientRepositoryMock.getByEmail(email)).once();
  });

  it('should return null if no client is found by email', async () => {
    const email = 'nonexistent@example.com';

    when(clientRepositoryMock.getByEmail(email)).thenResolve(null);

    const result = await clientRepository.getByEmail(email);

    expect(result).toBeNull();
    verify(clientRepositoryMock.getByEmail(email)).once();
  });

  it('should create a client', async () => {
    const createClientDto = {
      email: 'test@example.com',
      name: 'Test Client',
      phone: '123456789',
    };

    const mockCreatedClient: any = {
      _id: '12345',
      ...createClientDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      validated: false,
    };

    when(clientRepositoryMock.create(createClientDto)).thenResolve(
      mockCreatedClient
    );

    const result = await clientRepository.create(createClientDto);

    expect(result).toEqual(mockCreatedClient);
    verify(clientRepositoryMock.create(createClientDto)).once();
  });

  it('should return a client by id', async () => {
    const clientId = '12345';
    const mockClient: any = {
      _id: clientId,
      email: 'test@example.com',
      name: 'Test Client',
      phone: '123456789',
      createdAt: new Date(),
      updatedAt: new Date(),
      validated: false,
    };

    when(clientRepositoryMock.getOne(clientId)).thenResolve(mockClient);

    const result = await clientRepository.getOne(clientId);

    expect(result).toEqual(mockClient);
    verify(clientRepositoryMock.getOne(clientId)).once();
  });

  it('should return null if no client is found by id', async () => {
    const clientId = 'nonexistent-id';

    when(clientRepositoryMock.getOne(clientId)).thenResolve(null);

    const result = await clientRepository.getOne(clientId);

    expect(result).toBeNull();
    verify(clientRepositoryMock.getOne(clientId)).once();
  });

  it('should return all clients', async () => {
    const mockClients: any[] = [
      {
        _id: '12345',
        email: 'test@example.com',
        name: 'Test Client 1',
        phone: '123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
        validated: false,
      },
      {
        _id: '12346',
        email: 'test2@example.com',
        name: 'Test Client 2',
        phone: '987654321',
        createdAt: new Date(),
        updatedAt: new Date(),
        validated: true,
      },
    ];

    when(clientRepositoryMock.getAll()).thenResolve(mockClients);

    const result = await clientRepository.getAll();

    expect(result).toEqual(mockClients);
    verify(clientRepositoryMock.getAll()).once();
  });

  it('should update a client by id', async () => {
    const clientId = '12345';
    const updateData = { name: 'Updated Client' };
    const updatedClient: any = {
      _id: clientId,
      email: 'test@example.com',
      name: 'Updated Client',
      phone: '123456789',
      createdAt: new Date(),
      updatedAt: new Date(),
      validated: true,
    };

    when(clientRepositoryMock.updateOne(clientId, updateData)).thenResolve(
      updatedClient
    );

    const result = await clientRepository.updateOne(clientId, updateData);

    expect(result).toEqual(updatedClient);
    verify(clientRepositoryMock.updateOne(clientId, updateData)).once();
  });
});
