import { ICreatePodcastRepository } from '@/data/protocols/ICreatePodcastRepository';
import { IFindPodcastByNameRepository } from '@/data/protocols/IFindPodcastByNameRepository';
import { Podcast } from '@/domain/entities/Podcast';
import { PodcastAlreadyExistsError } from '@/domain/errors/PodcastAlreadyExistsError';

import {
  CreatePodcastParams,
  ICreatePodcastUseCase,
} from './ICreatePodcastUseCase';

export class CreatePodcastUseCase implements ICreatePodcastUseCase {
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
