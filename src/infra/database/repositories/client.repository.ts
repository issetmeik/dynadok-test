import { BaseRepository } from './base.repository';
import ClientModel, { IClientDocument } from '../models/client.model';
import { injectable } from 'inversify';

@injectable()
export class ClientRepository extends BaseRepository<IClientDocument> {
  constructor() {
    super(ClientModel);
  }

  async getByEmail(email: string): Promise<IClientDocument | null> {
    return this.model.findOne({ email }).exec();
  }
}
