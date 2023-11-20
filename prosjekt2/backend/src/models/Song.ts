import mongoose, { Schema } from 'mongoose';

const songSchema = new Schema({
  title: String,
  tag: String,
  artist: String,
  year: Number,
  views: Number,
  lyrics: String,
  id: Number,
});

const Song = mongoose.model('Song', songSchema);

module.exports = { Song };
