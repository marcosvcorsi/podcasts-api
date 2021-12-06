import { MongoMemoryServer } from 'mongodb-memory-server';

import { CreatePodcastParams } from '@/domain/useCases/createPodcast/ICreatePodcastUseCase';
import { connect, disconnect } from '@/infra/database/mongodb';
import { PodcastsRepository } from '@/infra/database/mongodb/repositories/PodcastsRepository';
import { Podcast as PodcastModel } from '@/infra/database/mongodb/schemas/PodcastSchema';

describe('PodcastsRepository Tests', () => {
  let mongod: MongoMemoryServer;
  let podcastsRepository: PodcastsRepository;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();

    const uri = mongod.getUri();

    await connect(uri);
  });

  beforeEach(async () => {
    await PodcastModel.deleteMany({});

    podcastsRepository = new PodcastsRepository();
  });

  afterAll(async () => {
    await disconnect();

    await mongod.stop();
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

  describe('find()', () => {
    it('should return podcasts', async () => {
      const createPodcastParams: CreatePodcastParams = {
        name: 'anyname',
        description: 'anydesc',
        links: ['http://example.com'],
      };

      const podcast = await PodcastModel.create(createPodcastParams);

      const result = await podcastsRepository.find({ page: 1, limit: 10 });

      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(String(result[0].id)).toBe(String(podcast._id));
    });

    it('should be able to return podcasts paginated', async () => {
      const createPodcastParams: CreatePodcastParams = {
        name: 'anyname2',
        description: 'anydesc',
        links: ['http://example.com'],
      };

      const podcast = await PodcastModel.create(createPodcastParams);

      await PodcastModel.create({
        name: 'anyname',
        description: 'anydesc',
        links: ['http://example.com'],
      });

      const result = await podcastsRepository.find({ page: 2, limit: 1 });

      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(String(result[0].id)).toBe(String(podcast._id));
    });

    it('should be able to return podcasts filtered by name', async () => {
      await PodcastModel.create({
        name: 'anyname',
        description: 'anydesc',
        links: ['http://example.com'],
      });

      const createPodcastParams: CreatePodcastParams = {
        name: 'othername',
        description: 'anydesc',
        links: ['http://example.com'],
      };

      const podcast = await PodcastModel.create(createPodcastParams);

      const result = await podcastsRepository.find({
        search: 'other',
        page: 1,
        limit: 10,
      });

      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(String(result[0].id)).toBe(String(podcast._id));
    });
  });
});
