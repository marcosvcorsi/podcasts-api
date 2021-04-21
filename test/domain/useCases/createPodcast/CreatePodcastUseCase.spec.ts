import { ICreatePodcastRepository } from '@/data/protocols/ICreatePodcastRepository';
import { IFindPodcastByNameRepository } from '@/data/protocols/IFindPodcastByNameRepository';
import { Podcast } from '@/domain/entities/Podcast';
import { PodcastAlreadyExistsError } from '@/domain/errors/PodcastAlreadyExistsError';
import { CreatePodcastUseCase } from '@/domain/useCases/createPodcast/CreatePodcastUseCase';
import { CreatePodcastParams } from '@/domain/useCases/createPodcast/ICreatePodcastUseCase';

const mockCreatePodcastParams = (): CreatePodcastParams => ({
  name: 'anyname',
  title: 'anytitle',
  links: ['anylink'],
});

const mockPodcast = (): Podcast => ({
  id: 'anyid',
  name: 'anyname',
  description: 'anydesc',
  links: ['anylink'],
});

const mockFindPodcastByNameRepository = () => {
  class FindPodcastByNameRepositoryStub
    implements IFindPodcastByNameRepository {
    async findByName(): Promise<Podcast | undefined> {
      return undefined;
    }
  }

  return new FindPodcastByNameRepositoryStub();
};

const mockCreatePodcastRepository = () => {
  class CreatePodcastRepositoryStub implements ICreatePodcastRepository {
    async create(): Promise<Podcast> {
      return mockPodcast();
    }
  }

  return new CreatePodcastRepositoryStub();
};

describe('CreatePodcastUseCase Tests', () => {
  let createPodcastUseCase: CreatePodcastUseCase;
  let findPodcastByNameRepository: IFindPodcastByNameRepository;
  let createPodcastRepository: ICreatePodcastRepository;

  beforeEach(() => {
    findPodcastByNameRepository = mockFindPodcastByNameRepository();
    createPodcastRepository = mockCreatePodcastRepository();

    createPodcastUseCase = new CreatePodcastUseCase(
      findPodcastByNameRepository,
      createPodcastRepository
    );
  });

  it('should call FindPodcastByNameRepository with correct values', async () => {
    const params = mockCreatePodcastParams();

    const findSpy = jest.spyOn(findPodcastByNameRepository, 'findByName');

    await createPodcastUseCase.create(params);

    expect(findSpy).toHaveBeenCalledWith(params.name);
  });

  it('should throw if FindPodcastByNameRepository throws', async () => {
    const params = mockCreatePodcastParams();

    jest
      .spyOn(findPodcastByNameRepository, 'findByName')
      .mockRejectedValueOnce(new Error());

    await expect(createPodcastUseCase.create(params)).rejects.toThrow();
  });

  it('should throw if FindPodcastByNameRepository finds one', async () => {
    const params = mockCreatePodcastParams();

    jest
      .spyOn(findPodcastByNameRepository, 'findByName')
      .mockResolvedValueOnce(mockPodcast());

    await expect(createPodcastUseCase.create(params)).rejects.toBeInstanceOf(
      PodcastAlreadyExistsError
    );
  });

  it('should call CreatePodcastRepository with correct values', async () => {
    const params = mockCreatePodcastParams();

    const createSpy = jest.spyOn(createPodcastRepository, 'create');

    await createPodcastUseCase.create(params);

    expect(createSpy).toHaveBeenCalledWith(params);
  });
});
