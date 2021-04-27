import { Podcast } from '@/domain/entities/Podcast';

export interface IListPodcastsUseCase {
  list(page: number): Promise<Podcast[]>;
}
