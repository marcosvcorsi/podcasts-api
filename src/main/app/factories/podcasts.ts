import { DbCreatePodcastUseCase } from '@/data/useCases/createPodcast/DbCreatePodcastUseCase';
import { PodcastRepository } from '@/infra/database/mongodb/repositories/PodcastRepository';
import { CreatePodcastController } from '@/presentation/controllers/CreatePodcastController';

export const makeCreatePodcastUseCase = (): DbCreatePodcastUseCase => {
  const podcastsRepository = new PodcastRepository();

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
