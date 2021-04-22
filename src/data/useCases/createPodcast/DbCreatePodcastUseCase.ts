import { PodcastAlreadyExistsError } from '@/data/errors/PodcastAlreadyExistsError';
import { ICreatePodcastRepository } from '@/data/protocols/ICreatePodcastRepository';
import { IFindPodcastByNameRepository } from '@/data/protocols/IFindPodcastByNameRepository';
import { Podcast } from '@/domain/entities/Podcast';
import {
  CreatePodcastParams,
  ICreatePodcastUseCase,
} from '@/domain/useCases/createPodcast/ICreatePodcastUseCase';

export class DbCreatePodcastUseCase implements ICreatePodcastUseCase {
  constructor(
    private readonly findPodcastByNameRepository: IFindPodcastByNameRepository,
    private readonly createPodcastRepository: ICreatePodcastRepository
  ) {}

  async create(data: CreatePodcastParams): Promise<Podcast> {
    const { name } = data;

    const podcastAlreadyExists = await this.findPodcastByNameRepository.findByName(
      name
    );

    if (podcastAlreadyExists) {
      throw new PodcastAlreadyExistsError();
    }

    const podcast = await this.createPodcastRepository.create(data);

    return podcast;
  }
}
