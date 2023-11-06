import { gql } from '@apollo/client';

export const GET_SONGS_BY_TITLE = gql`
  query SongsByTitle(
    $title: String!
    $index: Int!
    $order: Int!
    $tag: String!
  ) {
    songsByTitle(title: $title, index: $index, order: $order, tag: $tag) {
      title
      tag
      artist
      year
      views
      lyrics
      id
    }
  }
`;
