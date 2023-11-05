import { gql } from '@apollo/client';

export const GET_NEXT_SONGS = gql`
  query Next12songs($index: Int!) {
    next12songs(index: $index) {
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
