import { Model, Document } from 'mongoose';

export class BaseRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async getOne(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async getAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async updateOne(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }
}
