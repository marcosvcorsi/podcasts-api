import { CreatePodcastUseCase } from '@/domain/useCases/createPodcast/CreatePodcastUseCase';
import { PodcastRepository } from '@/infra/database/mongodb/repositories/PodcastRepository';
import { CreatePodcastController } from '@/presentation/controllers/CreatePodcastController';

export const makeCreatePodcastUseCase = (): CreatePodcastUseCase => {
  const podcastsRepository = new PodcastRepository();

  const createPodcastUseCase = new CreatePodcastUseCase(
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
