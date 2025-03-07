import { ValidationException } from '../../exceptions';
import { isValidObjectId } from 'mongoose';

export class ClientFindOneDto {
  constructor(public readonly id: string) {}

  static from(body: Partial<ClientFindOneDto>) {
    if (!body.id) throw new ValidationException('Missing porperty id');

    if (!isValidObjectId(body.id))
      throw new ValidationException('Invalid MongoDB ObjectId');

    return new ClientFindOneDto(body.id);
  }
}
