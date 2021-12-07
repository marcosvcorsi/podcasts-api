import pino from 'pino';

import { app } from './app';

const logger = pino();

const port = process.env.PORT || 3000;

logger.info('updated new cli is working');

app.listen(port, () => logger.info(`Server is running on port ${port}`));
