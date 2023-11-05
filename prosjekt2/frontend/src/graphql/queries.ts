import { gql } from '@apollo/client';

export const GET_SONGS_BY_TITLE = gql`
  query SongsByTitle($title: String!, $index: Int!, $order: Int!) {
    songsByTitle(title: $title, index: $index, order: $order) {
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
