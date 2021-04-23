import dotenv from 'dotenv';

const env = process.env.NODE_ENV;

dotenv.config({
  path: `.env${env ? `.${env}` : ''}`,
});
