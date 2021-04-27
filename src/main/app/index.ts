import cors from 'cors';
import express from 'express';
import 'express-async-errors';

import '@/main/config/env';
import { connect } from '@/infra/database/mongodb';

import { routes } from './routes';

connect();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => res.send('OK Novo'));

app.use('/api', routes);

export { app };
