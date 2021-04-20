import { Podcast } from '../entities/Podcast';

export type CreatePodcastParams = {
  name: string;
  title: string;
  links: string[];
};

export interface ICreatePodcast {
  create(data: CreatePodcastParams): Promise<Podcast>;
}
