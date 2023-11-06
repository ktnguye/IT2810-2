import mongoose, { Schema } from "mongoose";

const Song = mongoose.model(
  "Song",
  new Schema({
    title: String,
    tag: String,
    artist: String,
    year: Number,
    views: Number,
    lyrics: String,
    id: Number,
  })
);

module.exports = { Song };
