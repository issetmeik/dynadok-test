import { BaseMiddleware } from './base-middleware';
import { Request, Response, NextFunction } from 'express';

export class ValidateRequest extends BaseMiddleware {
  constructor(
    private readonly _dtoClass: { from: any },
    private readonly _withParams = false,
    private readonly _withQuery = false,
    private readonly _withFile = false
  ) {
    super();
  }
  public execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Promise<void> {
    if (this._withParams) {
      req.body = {
        ...req.body,
        ...req.params,
      };
    }

    if (this._withQuery) {
      req.body = { ...req.body, ...req.query };
    }

    req.body = this._dtoClass.from(req.body);
    next();
  }

  static with(dto: any) {
    return new ValidateRequest(dto).execute;
  }

  static withParams(dto: any) {
    return new ValidateRequest(dto, true).execute;
  }

  static withQuery(dto: any) {
    return new ValidateRequest(dto, false, true).execute;
  }
}
