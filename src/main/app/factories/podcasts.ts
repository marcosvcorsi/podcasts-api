import { DbCreatePodcastUseCase } from '@/data/useCases/createPodcast/DbCreatePodcastUseCase';
import { DbListPodcastsUseCase } from '@/data/useCases/listPodcasts/DbListPodcastsUseCase';
import { PodcastsRepository } from '@/infra/database/mongodb/repositories/PodcastsRepository';
import { CreatePodcastController } from '@/presentation/controllers/CreatePodcastController';
import { ListPodcastsController } from '@/presentation/controllers/ListPodcastsController';

export const makeCreatePodcastUseCase = (): DbCreatePodcastUseCase => {
  const podcastsRepository = new PodcastsRepository();

  const createPodcastUseCase = new DbCreatePodcastUseCase(
    podcastsRepository,
    podcastsRepository
  );

  return createPodcastUseCase;
};

export const makeCreatePodcastController = (): CreatePodcastController => {
  const createPodcastController = new CreatePodcastController(
    makeCreatePodcastUseCase()
  );

  return createPodcastController;
};

export const makeListPodcastsUseCase = (): DbListPodcastsUseCase => {
  const podcastsRepository = new PodcastsRepository();

  const listPodcastsUseCase = new DbListPodcastsUseCase(podcastsRepository);

  return listPodcastsUseCase;
};

export const makeListPodcastsController = (): ListPodcastsController => {
  const listPodcastsController = new ListPodcastsController(
    makeListPodcastsUseCase()
  );

  return listPodcastsController;
};
