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
