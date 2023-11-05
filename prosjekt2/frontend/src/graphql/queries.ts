import { gql } from '@apollo/client';

export const GET_SONGS_BY_TITLE = gql`
  query SongsByTitle($title: String!, $index: Int!) {
    songsByTitle(title: $title, index: $index) {
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
