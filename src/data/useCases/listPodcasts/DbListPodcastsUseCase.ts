import { IFindPodcastsRepository } from '@/data/protocols/IFindPodcastsRepository';
import { Podcast } from '@/domain/entities/Podcast';
import {
  IListPodcastsUseCase,
  ListPodcastsParams,
} from '@/domain/useCases/listPodcasts/IListPodcastsUseCase';

export class DbListPodcastsUseCase implements IListPodcastsUseCase {
  constructor(
    private readonly findPodcastsRepository: IFindPodcastsRepository
  ) {}

  async list({ search, page, limit }: ListPodcastsParams): Promise<Podcast[]> {
    const podcasts = await this.findPodcastsRepository.find({
      search,
      page,
      limit,
    });

    return podcasts;
  }
}
