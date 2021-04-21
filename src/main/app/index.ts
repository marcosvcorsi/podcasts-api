import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import 'dotenv/config';

import '@/infra/database/mongodb';

import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

export { app };
