import { Request, Response } from './http';

export interface IController {
  handle(request: Request): Promise<Response>;
}
