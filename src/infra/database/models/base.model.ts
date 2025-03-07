import mongoose, { Schema, Document } from 'mongoose';

export interface IBaseEntity extends Document {
  createdAt: Date;
  updatedAt: Date;
}

const baseEntitySchema: Schema = new Schema(
  {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    _id: true,
  }
);

export default baseEntitySchema;
