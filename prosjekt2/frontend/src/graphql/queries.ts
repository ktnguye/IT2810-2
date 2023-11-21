import { gql } from '@apollo/client';

export const GET_SONGS_BY_TITLE = gql`
  query SongsByTitle(
    $searchTerm: String!
    $index: Int!
    $order: Int!
    $tag: String!
  ) {
    songsByTitle(
      searchTerm: $searchTerm
      index: $index
      order: $order
      tag: $tag
    ) {
      title
      tag
      artist
      year
      views
      lyrics
      id
    }
    tags(searchTerm: $searchTerm)
  }
`;

export const GET_SONG = gql`
  query Song($id: Int!) {
    song(id: $id) {
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

export const GET_REVIEWS_BY_SONG_ID = gql`
  query ReviewsBySongId($songId: Int!) {
    reviewsBySongId(songId: $songId) {
      songId
      name
      rating
      date
      review
    }
  }
`;
