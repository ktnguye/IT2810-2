import mongoose, { Schema } from 'mongoose';

const reviewSchema = new Schema({
  id: String,
  songId: String,
  name: String,
  rating: Number,
  date: String,
  review: String,
  ownerID: String,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = { Review };
