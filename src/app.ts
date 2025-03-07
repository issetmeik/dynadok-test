import express from 'express';
import mongoose from 'mongoose';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './config/di-container';
import { errorMiddleware } from './utils/middlewares/error-handler.middleware';
import dotenv from 'dotenv';

dotenv.config();

export function setup() {
  const server = new InversifyExpressServer(container);

  server.setErrorConfig((app) => {
    app.use(errorMiddleware);
  });
  server.setConfig((app) => {
    app.use(express.json());
  });

  connectDB();
  const app = server.build();

  return app;
}

const connectDB = async () => {
  try {
    const dbURI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`;
    await mongoose.connect(dbURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
