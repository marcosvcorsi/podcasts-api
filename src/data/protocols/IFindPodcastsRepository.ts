import { Podcast } from '@/domain/entities/Podcast';

export type FindPodcastsRepositoryParams = {
  search?: string;
  page: number;
  limit: number;
};

export interface IFindPodcastsRepository {
  find(data: FindPodcastsRepositoryParams): Promise<Podcast[]>;
}
