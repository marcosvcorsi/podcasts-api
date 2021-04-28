import { ICreatePodcastRepository } from '@/data/protocols/ICreatePodcastRepository';
import { IFindPodcastByNameRepository } from '@/data/protocols/IFindPodcastByNameRepository';
import {
  FindPodcastsRepositoryParams,
  IFindPodcastsRepository,
} from '@/data/protocols/IFindPodcastsRepository';
import { Podcast } from '@/domain/entities/Podcast';
import { CreatePodcastParams } from '@/domain/useCases/createPodcast/ICreatePodcastUseCase';

import { map, mapCollection } from '../helpers/mapper';
import { Podcast as PodcastModel } from '../schemas/PodcastSchema';

export class PodcastsRepository
  implements
    ICreatePodcastRepository,
    IFindPodcastByNameRepository,
    IFindPodcastsRepository {
  async create(data: CreatePodcastParams): Promise<Podcast> {
    const podcast = await PodcastModel.create(data);

    return map<Podcast>(podcast);
  }

  async findByName(name: string): Promise<Podcast | undefined> {
    const podcast = await PodcastModel.findOne({ name });

    return podcast ? map<Podcast>(podcast) : undefined;
  }

  async find({
    page,
    limit,
  }: FindPodcastsRepositoryParams): Promise<Podcast[]> {
    const skip = (page - 1) * limit;

    const podcasts = await PodcastModel.find().skip(skip).limit(limit);

    return mapCollection<Podcast>(podcasts);
  }
}
