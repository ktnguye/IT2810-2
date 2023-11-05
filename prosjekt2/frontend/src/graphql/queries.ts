import { gql } from '@apollo/client';

export const GET_SONGS_BY_TITLE = gql`
  query SongsByTitle(
    $title: String!
    $index: Int!
    $order: Int!
    $genre: String!
  ) {
    songsByTitle(title: $title, index: $index, order: $order, genre: $genre) {
      id
      title
      artist
      genres
      year
      album
      length
      rating
    }
  }
`;
