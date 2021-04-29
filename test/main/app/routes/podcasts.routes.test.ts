import { disconnect } from 'mongoose';
import request from 'supertest';

import { connect } from '@/infra/database/mongodb';
import { Podcast as PodcastModel } from '@/infra/database/mongodb/schemas/PodcastSchema';
import { app } from '@/main/app';

describe('Podcasts Routes Tests', () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await PodcastModel.deleteMany({});
  });

  afterAll(async () => {
    await disconnect();
  });

  describe('POST /podcasts', () => {
    it('should be able to create a new podcast', async () => {
      const response = await request(app)
        .post('/api/podcasts')
        .send({
          name: 'anyname',
          description: 'anydesc',
          links: ['http://example.com'],
        });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
    });

    it('should not be able to create a new podcast with name that already taken', async () => {
      const body = {
        name: 'anyname',
        description: 'anydesc',
        links: ['http://example.com'],
      };

      await PodcastModel.create(body);

      const response = await request(app).post('/api/podcasts').send(body);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Podcast already exists');
    });
  });

  describe('GET /podcasts', () => {
    it('should return podcasts with default pagination', async () => {
      const body = {
        name: 'anyname',
        description: 'anydesc',
        links: ['http://example.com'],
      };

      await PodcastModel.create(body);

      const response = await request(app).get('/api/podcasts');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].name).toBe(body.name);
    });

    it('should return podcasts with custom pagination', async () => {
      await PodcastModel.create({
        name: 'anyname2',
        description: 'anydesc2',
        links: ['http://example.com2'],
      });

      const body = {
        name: 'anyname',
        description: 'anydesc',
        links: ['http://example.com'],
      };

      await PodcastModel.create(body);

      const response = await request(app).get('/api/podcasts').query({
        page: 2,
        limit: 1,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].name).toBe(body.name);
    });
  });
});
