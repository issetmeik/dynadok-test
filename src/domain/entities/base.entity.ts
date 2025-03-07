export class BaseEntity {
  _id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(_id: string) {
    this._id = _id;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
