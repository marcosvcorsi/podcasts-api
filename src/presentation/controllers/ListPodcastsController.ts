import { IListPodcastsUseCase } from '@/domain/useCases/listPodcasts/IListPodcastsUseCase';

import { IController } from '../protocols/controller';
import { internalServerError, ok, Request, Response } from '../protocols/http';

export class ListPodcastsController implements IController {
  constructor(private readonly listPodcastsUseCase: IListPodcastsUseCase) {}

  async handle(request: Request): Promise<Response> {
    try {
      const { page = 1, limit = 10 } = request.query;

      const podcasts = await this.listPodcastsUseCase.list({
        page: Number(page),
        limit: Number(limit),
      });

      return ok(podcasts);
    } catch (error) {
      return internalServerError();
    }
  }
}
