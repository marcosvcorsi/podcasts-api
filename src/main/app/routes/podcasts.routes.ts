import { Router } from 'express';

import { adaptRoute } from '../adapters/express/routes';
import { makeCreatePodcastController } from '../factories/podcasts';

const podcastsRouter = Router();

podcastsRouter.post('/', adaptRoute(makeCreatePodcastController()));

export { podcastsRouter };
