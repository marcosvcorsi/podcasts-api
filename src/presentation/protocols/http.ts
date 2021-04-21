export type Request = {
  statusCode: number;
  body: any;
  params: any;
  query: any;
};

export type Response = {
  statusCode: number;
  body: any;
};

const CREATED = 201;

const BAD_REQUEST = 400;

const makeResponse = (statusCode: number, body: any): Response => ({
  statusCode,
  body,
});

export const created = (body: any): Response => makeResponse(CREATED, body);

export const badRequest = (body: any): Response =>
  makeResponse(BAD_REQUEST, body);
