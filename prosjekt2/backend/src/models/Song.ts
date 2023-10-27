import mongoose, { Schema } from "mongoose";

const Song = mongoose.model(
  "Song",
  new Schema({
    title: String,
    artist: String,
    genres: [String],
    year: Number,
    album: String,
    length: Number,
    rating: Number,
    cover: String,
  })
);

module.exports = { Song };
