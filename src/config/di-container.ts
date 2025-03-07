import { Container } from 'inversify';
import { ClientController } from '../controllers/client.controller';
import { ClientService } from '../services/client.service';
import { ClientRepository } from '../infra/database/repositories/client.repository';
import { RedisCache } from '../infra/cache/redis.cache';

export const container = new Container({
  defaultScope: 'Singleton',
});

container.bind(ClientController).toSelf();
container.bind(ClientService).toSelf();
container.bind(ClientRepository).toSelf();
container.bind(RedisCache).toSelf();
