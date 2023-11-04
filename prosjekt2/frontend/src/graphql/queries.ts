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

export const GET_SONGS_BY_TITLE = gql`
  query SongsByTitle($title: String!) {
    songsByTitle(title: $title) {
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
