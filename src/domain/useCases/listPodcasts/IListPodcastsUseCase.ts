import { Podcast } from '@/domain/entities/Podcast';

export type ListPodcastsParams = {
  search?: string;
  page: number;
  limit: number;
};

export interface IListPodcastsUseCase {
  list(data: ListPodcastsParams): Promise<Podcast[]>;
}
