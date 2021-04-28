import { Podcast } from '@/domain/entities/Podcast';

export type ListPodcastsParams = {
  page: number;
  limit: number;
};

export interface IListPodcastsUseCase {
  list(data: ListPodcastsParams): Promise<Podcast[]>;
}
