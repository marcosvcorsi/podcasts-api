import { PodcastAlreadyExistsError } from '@/data/errors/PodcastAlreadyExistsError';
import { Podcast } from '@/domain/entities/Podcast';
import { ICreatePodcastUseCase } from '@/domain/useCases/createPodcast/ICreatePodcastUseCase';
import { CreatePodcastController } from '@/presentation/controllers/CreatePodcastController';
import {
  badRequest,
  created,
  internalServerError,
  Request,
} from '@/presentation/protocols/http';

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

const mockRequest = (params = {}): Request => ({
  body: {
    name: 'anyname',
    description: 'anydesc',
    links: ['http://example.com'],
    ...params,
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

  it('should return badRequest when name is missing', async () => {
    const request = mockRequest({
      name: undefined,
    });

    const response = await createPodcastController.handle(request);

    expect(response).toEqual(badRequest({ errors: ['name is required'] }));
  });

  it('should return badRequest when description is missing', async () => {
    const request = mockRequest({
      description: undefined,
    });

    const response = await createPodcastController.handle(request);

    expect(response).toEqual(
      badRequest({ errors: ['description is required'] })
    );
  });

  it('should return badRequest when links is missing', async () => {
    const request = mockRequest({
      links: undefined,
    });

    const response = await createPodcastController.handle(request);

    expect(response).toEqual(badRequest({ errors: ['links is required'] }));
  });

  it('should return badRequest when podcast with name already exists', async () => {
    jest
      .spyOn(createPodcastUseCase, 'create')
      .mockRejectedValueOnce(new PodcastAlreadyExistsError());

    const request = mockRequest();

    const response = await createPodcastController.handle(request);

    expect(response).toEqual(badRequest({ error: 'Podcast already exists' }));
  });

  it('should return internalServerError when something wrong happened', async () => {
    jest
      .spyOn(createPodcastUseCase, 'create')
      .mockRejectedValueOnce(new Error('any error'));

    const request = mockRequest();

    const response = await createPodcastController.handle(request);

    expect(response).toEqual(internalServerError());
  });
});
