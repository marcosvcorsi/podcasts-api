import { Router } from 'express';

import { podcastsRouter } from './podcasts.routes';

const routes = Router();

routes.use('/podcasts', podcastsRouter);

export { routes };
