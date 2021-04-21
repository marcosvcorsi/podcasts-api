import { ICreatePodcastUseCase } from '@/domain/useCases/createPodcast/ICreatePodcastUseCase';

import { validateRequiredParams } from '../helpers/validation';
import { IController } from '../protocols/controller';
import { Request, Response, created, badRequest } from '../protocols/http';

export class CreatePodcastController implements IController {
  constructor(private readonly createPodcastUseCase: ICreatePodcastUseCase) {}

  async handle(request: Request): Promise<Response> {
    const { isValid, errors } = validateRequiredParams(request.body, [
      'name',
      'description',
      'links',
    ]);

    if (!isValid) {
      return badRequest({ errors });
    }

    const { name, description, links } = request.body;

    const podcast = await this.createPodcastUseCase.create({
      name,
      description,
      links,
    });

    return created(podcast);
  }
}
