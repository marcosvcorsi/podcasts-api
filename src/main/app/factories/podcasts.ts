import { DbCreatePodcastUseCase } from '@/data/useCases/createPodcast/DbCreatePodcastUseCase';
import { PodcastsRepository } from '@/infra/database/mongodb/repositories/PodcastsRepository';
import { CreatePodcastController } from '@/presentation/controllers/CreatePodcastController';

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
