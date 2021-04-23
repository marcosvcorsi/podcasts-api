import { CreatePodcastParams } from '@/domain/useCases/createPodcast/ICreatePodcastUseCase';
import { connect, disconnect } from '@/infra/database/mongodb';
import { PodcastsRepository } from '@/infra/database/mongodb/repositories/PodcastsRepository';
import { Podcast as PodcastModel } from '@/infra/database/mongodb/schemas/PodcastSchema';

describe('PodcastsRepository Tests', () => {
  let podcastsRepository: PodcastsRepository;

  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await PodcastModel.deleteMany({});

    podcastsRepository = new PodcastsRepository();
  });

  afterAll(async () => {
    await disconnect();
  });

  describe('findByName()', () => {
    it('should return podcast by name', async () => {
      const createPodcastParams: CreatePodcastParams = {
        name: 'anyname',
        description: 'anydesc',
        links: ['http://example.com'],
      };

      const podcast = await PodcastModel.create(createPodcastParams);

      const result = await podcastsRepository.findByName(
        createPodcastParams.name
      );

      expect(result).toBeDefined();
      expect(String(result?.id)).toBe(String(podcast.id));
      expect(result?.name).toBe(createPodcastParams.name);
    });

    it('should return undefined when find by name has no match', async () => {
      const result = await podcastsRepository.findByName('anyname');

      expect(result).toBeUndefined();
    });
  });

  describe('create()', () => {
    it('should create podcast', async () => {
      const createPodcastParams: CreatePodcastParams = {
        name: 'anyname',
        description: 'anydesc',
        links: ['http://example.com'],
      };

      const podcast = await podcastsRepository.create(createPodcastParams);

      expect(podcast).toBeDefined();
      expect(podcast.id).toBeDefined();
    });
  });
});