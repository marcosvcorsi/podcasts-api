import { IFindPodcastByNameRepository } from '@/data/protocols/IFindPodcastByNameRepository';
import { Podcast } from '@/domain/entities/Podcast';

import {
  CreatePodcastParams,
  ICreatePodcastUseCase,
} from './ICreatePodcastUseCase';

export class CreatePodcastUseCase implements ICreatePodcastUseCase {
  constructor(
    private readonly findPodcastByNameRepository: IFindPodcastByNameRepository
  ) {}

  async create(data: CreatePodcastParams): Promise<Podcast> {
    const { name } = data;

    await this.findPodcastByNameRepository.findByName(name);

    return {} as Podcast;
  }
}
