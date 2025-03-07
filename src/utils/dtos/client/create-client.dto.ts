import { ValidationException } from '../../exceptions';

export class CreateClientDto {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly phone: string
  ) {}

  static from(body: Partial<CreateClientDto>) {
    if (!body.name) throw new ValidationException('Missing property name.');
    if (!body.email) throw new ValidationException('Missing property email.');
    if (!body.phone) throw new ValidationException('Missing property phone.');

    return new CreateClientDto(body.name, body.email, body.phone);
  }
}
