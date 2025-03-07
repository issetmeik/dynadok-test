import { NextFunction, Request, Response } from 'express';
import { HttpException, ValidationException } from '../exceptions';
import { BaseHttpResponse } from '../base-http-response';

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ValidationException) {
    const response = BaseHttpResponse.failed(err.message);
    res.status(response.statusCode).json(response);
    next();
  }
  if (err instanceof HttpException) {
    const response = BaseHttpResponse.failed(err.message, err.statusCode);
    res.status(response.statusCode).json(response);
    next();
  }
  if (err instanceof Error) {
    const response = BaseHttpResponse.failed(err.message, 500);
    res.status(response.statusCode).json(response);
    next();
  }
}
