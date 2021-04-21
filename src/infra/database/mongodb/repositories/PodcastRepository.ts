import { ICreatePodcastRepository } from '@/data/protocols/ICreatePodcastRepository';
import { IFindPodcastByNameRepository } from '@/data/protocols/IFindPodcastByNameRepository';
import { Podcast } from '@/domain/entities/Podcast';
import { CreatePodcastParams } from '@/domain/useCases/createPodcast/ICreatePodcastUseCase';

import { map } from '../helpers/mapper';
import { Podcast as PodcastModel } from '../schemas/PodcastSchema';

export class PodcastRepository
  implements ICreatePodcastRepository, IFindPodcastByNameRepository {
  async create(data: CreatePodcastParams): Promise<Podcast> {
    const podcast = await PodcastModel.create(data);

    return map<Podcast>(podcast);
  }

  async findByName(name: string): Promise<Podcast | undefined> {
    const podcast = await PodcastModel.findOne({ name });

    return podcast ? map<Podcast>(podcast) : undefined;
  }
}
