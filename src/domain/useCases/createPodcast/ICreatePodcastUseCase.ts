import { Podcast } from '@/domain/entities/Podcast';

export type CreatePodcastParams = {
  name: string;
  description: string;
  links: string[];
};

export interface ICreatePodcastUseCase {
  create(data: CreatePodcastParams): Promise<Podcast>;
}
