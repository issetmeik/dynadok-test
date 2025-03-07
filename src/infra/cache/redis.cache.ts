import { injectable } from 'inversify';
import Redis from 'ioredis';

@injectable()
export class RedisCache {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
    });

    this.client.on('error', (err) => {
      console.error('Erro no Redis:', err);
    });
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set<T>(key: string, value: T, ttl: number = 3600): Promise<void> {
    await this.client.set(key, JSON.stringify(value), 'EX', ttl);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}
