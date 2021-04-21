import mongoose from 'mongoose';

const podcastSchema = new mongoose.Schema({
  name: String,
  description: String,
  links: [String],
});

const Podcast = mongoose.model('Podcast', podcastSchema);

export { Podcast };
