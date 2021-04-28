import { IFindPodcastsRepository } from '@/data/protocols/IFindPodcastsRepository';
import { DbListPodcastsUseCase } from '@/data/useCases/listPodcasts/DbListPodcastsUseCase';
import { Podcast } from '@/domain/entities/Podcast';

const mockPodcast = (): Podcast => ({
  id: 'anyid',
  name: 'anyname',
  description: 'anydesc',
  links: ['anylink'],
});

const mockFindPodcastsRepository = () => {
  class FindPodcastsRepositoryStub implements IFindPodcastsRepository {
    async find(): Promise<Podcast[]> {
      return [mockPodcast()];
    }
  }

  return new FindPodcastsRepositoryStub();
};

describe('DbListPodcastsUseCase Tests', () => {
  let dbListPodcastsUseCase: DbListPodcastsUseCase;
  let findPodcastsRepository: IFindPodcastsRepository;

  beforeEach(() => {
    findPodcastsRepository = mockFindPodcastsRepository();
    dbListPodcastsUseCase = new DbListPodcastsUseCase(findPodcastsRepository);
  });

  it('should call FindPodcastsRepository', async () => {
    const findSpy = jest.spyOn(findPodcastsRepository, 'find');

    const page = 1;
    const limit = 10;

    await dbListPodcastsUseCase.list({ page, limit });

    expect(findSpy).toHaveBeenCalledWith({
      page,
      limit,
    });
  });
});
