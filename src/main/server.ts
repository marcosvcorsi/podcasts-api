import pino from 'pino';

import { app } from './app';

const logger = pino();

const port = process.env.PORT || 3000;

app.listen(port, () => logger.info(`Server is running on port ${port}`));
