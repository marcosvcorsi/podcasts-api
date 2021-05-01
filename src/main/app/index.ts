import cors from 'cors';
import express from 'express';
import { resolve } from 'path';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import '@/main/config/env';
import { connect } from '@/infra/database/mongodb';

import { routes } from './routes';

connect();

const app = express();

app.use(cors());
app.use(express.json());

const swaggerDocument = YAML.load(resolve(__dirname, 'docs', 'swagger.yml'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', routes);

export { app };
