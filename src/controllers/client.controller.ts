import { Request, Response } from 'express';
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
} from 'inversify-express-utils';
import {
  ClientFindOneDto,
  CreateClientDto,
  UpdateClientDto,
} from '../utils/dtos';
import { ClientService } from '../services/client.service';
import { ValidateRequest } from '../utils/middlewares/validate-request.middleware';
import { BaseHttpResponse } from '../utils/base-http-response';
import { RedisCache } from '../infra/cache/redis.cache';

@controller('/api/clients')
export class ClientController {
  constructor(
    private readonly service: ClientService,
    private readonly redis: RedisCache
  ) {}

  @httpPost('/', ValidateRequest.with(CreateClientDto))
  async store(req: Request, res: Response) {
    const client = await this.service.create(req.body);
    const response = BaseHttpResponse.success(client, 201);
    res.status(response.statusCode).json(response);
  }

  @httpGet('/')
  async index(req: Request, res: Response) {
    const clients = await this.service.findAll();
    const response = BaseHttpResponse.success(clients);
    res.status(response.statusCode).json(response);
  }

  @httpGet('/:id', ValidateRequest.withParams(ClientFindOneDto))
  async getOne(req: Request, res: Response) {
    const { id } = req.body;
    const cacheKey = `client:${id}`;
    const cachedData = await this.redis.get(cacheKey);
    if (cachedData) {
      const response = BaseHttpResponse.success(cachedData);
      return res.status(response.statusCode).json(response);
    }
    const client = await this.service.findOne(req.body.id);
    await this.redis.set(cacheKey, client);
    const response = BaseHttpResponse.success(client);
    res.status(response.statusCode).json(response);
  }

  @httpPatch('/:id', ValidateRequest.withParams(UpdateClientDto))
  async update(req: Request, res: Response) {
    const client = await this.service.update(req.body);
    const response = BaseHttpResponse.success(client);
    res.status(response.statusCode).json(response);
  }
}
