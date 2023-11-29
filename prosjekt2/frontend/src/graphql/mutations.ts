import { gql } from '@apollo/client';

export const CREATE_REVIEW = gql`
  mutation CreateReview(
    $songId: Int!
    $name: String!
    $rating: Int!
    $date: String!
    $review: String!
    $ownerID: String!
  ) {
    createReview(
      songId: $songId
      name: $name
      rating: $rating
      date: $date
      review: $review
      ownerID: $ownerID
    ) {
      songId
      name
      rating
      date
      review
      ownerID
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id) {
      songId
      name
      rating
      date
      review
      ownerID
    }
  }
`;
