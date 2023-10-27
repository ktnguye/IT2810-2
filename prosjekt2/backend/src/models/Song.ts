import mongoose, { Schema } from "mongoose";

const songSchema = new Schema({
  title: String,
  artist: String,
  genres: [String],
  year: Number,
  album: String,
  length: Number,
  rating: Number,
  cover: String,
});

const Song = mongoose.model("Song", songSchema);

module.exports = { Song };
