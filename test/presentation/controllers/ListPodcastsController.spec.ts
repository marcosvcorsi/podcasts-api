import { Podcast } from '@/domain/entities/Podcast';
import { IListPodcastsUseCase } from '@/domain/useCases/listPodcasts/IListPodcastsUseCase';
import { ListPodcastsController } from '@/presentation/controllers/ListPodcastsController';
import { internalServerError, Request } from '@/presentation/protocols/http';

const mockRequest = (): Request => ({
  query: {
    page: '1',
    limit: '10',
  },
});

const mockListPodcastsUseCase = (): IListPodcastsUseCase => {
  class ListPodcastsUseCaseStub implements IListPodcastsUseCase {
    async list(): Promise<Podcast[]> {
      return [
        {
          id: 'anyid',
          description: 'anydesc',
          links: ['http://anylink.com'],
          name: 'anyname',
        },
      ];
    }
  }

  return new ListPodcastsUseCaseStub();
};

describe('ListPodcastsController Tests', () => {
  let listPodcastsController: ListPodcastsController;
  let listPodcastsUseCaseStub: IListPodcastsUseCase;

  beforeEach(() => {
    listPodcastsUseCaseStub = mockListPodcastsUseCase();
    listPodcastsController = new ListPodcastsController(
      listPodcastsUseCaseStub
    );
  });

  it('should call DbListPodcastsUseCase with correct values', async () => {
    const listSpy = jest.spyOn(listPodcastsUseCaseStub, 'list');

    const request = mockRequest();

    await listPodcastsController.handle(request);

    expect(listSpy).toHaveBeenCalledWith({
      page: Number(request.query.page),
      limit: Number(request.query.limit),
    });
  });

  it('should return internalServerError when DbListPodcastUseCase throws', async () => {
    jest
      .spyOn(listPodcastsUseCaseStub, 'list')
      .mockRejectedValueOnce(new Error());

    const request = mockRequest();

    const result = await listPodcastsController.handle(request);

    expect(result).toEqual(internalServerError());
  });
});
