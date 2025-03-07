import { isValidObjectId } from 'mongoose';
import { ValidationException } from '../../exceptions';

export class UpdateClientDto {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly email?: string,
    public readonly phone?: string
  ) {}

  static from(body: Partial<UpdateClientDto>) {
    if (!body.id) throw new ValidationException('Missing porperty id');

    if (!isValidObjectId(body.id))
      throw new ValidationException('Invalid MongoDB ObjectId');

    return new UpdateClientDto(body.id, body.name, body.email, body.phone);
  }
}
