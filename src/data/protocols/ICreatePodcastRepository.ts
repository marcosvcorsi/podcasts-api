import { Podcast } from '@/domain/entities/Podcast';
import { CreatePodcastParams } from '@/domain/useCases/createPodcast/ICreatePodcastUseCase';

export interface ICreatePodcastRepository {
  create(data: CreatePodcastParams): Promise<Podcast>;
}
