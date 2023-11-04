import { gql } from '@apollo/client';

export const GET_SONGS = gql`
  query {
    songs {
      id
      title
      artist
      genres
      year
      album
      length
      rating
      cover
    }
  }
`;
