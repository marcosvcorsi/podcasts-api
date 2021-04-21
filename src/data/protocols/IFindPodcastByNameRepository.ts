import { Podcast } from '@/domain/entities/Podcast';

export interface IFindPodcastByNameRepository {
  findByName(name: string): Promise<Podcast | undefined>;
}
