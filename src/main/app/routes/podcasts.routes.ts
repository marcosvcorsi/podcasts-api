import { Router } from 'express';

import { adaptRoute } from '../adapters/express/routes';
import {
  makeCreatePodcastController,
  makeListPodcastsController,
} from '../factories/podcasts';

const podcastsRouter = Router();

podcastsRouter.post('/', adaptRoute(makeCreatePodcastController()));

podcastsRouter.get('/', adaptRoute(makeListPodcastsController()));

export { podcastsRouter };
