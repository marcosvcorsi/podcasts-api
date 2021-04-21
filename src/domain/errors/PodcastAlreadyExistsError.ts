export class PodcastAlreadyExistsError extends Error {
  constructor() {
    super('Podcast already exists');

    this.name = 'PodcastAlreadyExistsError';
  }
}
