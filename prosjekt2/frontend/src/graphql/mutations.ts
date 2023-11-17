import { gql } from '@apollo/client';

export const CREATE_REVIEW = gql`
  mutation CreateReview(
    $songId: Int!
    $name: String!
    $rating: Int!
    $date: String!
    $review: String!
  ) {
    createReview(
      songId: $songId
      name: $name
      rating: $rating
      date: $date
      review: $review
    ) {
      songId
      name
      rating
      date
      review
    }
  }
`;
