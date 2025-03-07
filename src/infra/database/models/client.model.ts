import mongoose, { Schema, Document } from 'mongoose';
import baseEntitySchema, { IBaseEntity } from './base.model';

export interface IClientDocument extends Document, IBaseEntity {
  name: string;
  phone: string;
  email: string;
  validated: boolean;
}

const clientSchema = new Schema<IClientDocument>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  validated: { type: Boolean, default: false },
});

clientSchema.add(baseEntitySchema);

clientSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const ClientModel = mongoose.model<IClientDocument>('Client', clientSchema);

export default ClientModel;
