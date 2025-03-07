import { BaseEntity } from './base.entity';

export class ClientEntity extends BaseEntity {
  name: string;
  phone: string;
  email: string;
  validated: boolean;

  constructor(
    _id: string,
    name: string,
    phone: string,
    email: string,
    validated: boolean
  ) {
    super(_id);
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.validated = validated;
  }
}
