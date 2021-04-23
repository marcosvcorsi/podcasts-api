export type Request = {
  body?: any;
  params?: any;
  query?: any;
};

export type Response = {
  statusCode: number;
  body?: any;
};

const CREATED = 201;

const BAD_REQUEST = 400;

const INTERNAL_SERVER_ERROR = 500;

const makeResponse = (statusCode: number, body: any): Response => ({
  statusCode,
  body,
});

export const created = (body: any): Response => makeResponse(CREATED, body);

export const badRequest = (body: any): Response =>
  makeResponse(BAD_REQUEST, body);

export const internalServerError = (): Response =>
  makeResponse(INTERNAL_SERVER_ERROR, { error: 'Ops, something is wrong' });
