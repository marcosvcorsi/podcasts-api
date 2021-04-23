import { Podcast } from '@/domain/entities/Podcast';
import { ICreatePodcastUseCase } from '@/domain/useCases/createPodcast/ICreatePodcastUseCase';
import { CreatePodcastController } from '@/presentation/controllers/CreatePodcastController';
import { created, Request } from '@/presentation/protocols/http';

const mockPodcast = (): Podcast => ({
  id: 'anyid',
  description: 'anydescription',
  links: ['anylink'],
  name: 'anyname',
});

const mockCreatePodcastUseCase = () => {
  class CreatePodcastUseCaseStub implements ICreatePodcastUseCase {
    async create(): Promise<Podcast> {
      return mockPodcast();
    }
  }

  return new CreatePodcastUseCaseStub();
};

const mockRequest = (): Request => ({
  body: {
    name: 'anyname',
    description: 'anydesc',
    links: ['http://example.com'],
  },
});

describe('CreatePodcastController Tests', () => {
  let createPodcastController: CreatePodcastController;
  let createPodcastUseCase: ICreatePodcastUseCase;

  beforeEach(() => {
    createPodcastUseCase = mockCreatePodcastUseCase();
    createPodcastController = new CreatePodcastController(createPodcastUseCase);
  });

  it('should return created on success', async () => {
    const request = mockRequest();

    const response = await createPodcastController.handle(request);

    expect(response).toEqual(created(mockPodcast()));
  });
});
