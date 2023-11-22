const gql = require('graphql-tag');

export const typeDefs = gql`
  type Query {
    greetings: String
    welcome(name: String!): String
    songs: [Song]
    song(id: Int): Song
    songsByTitle(
      searchTerm: String
      index: Int
      order: Int
      tag: String
      isShowingFavourites: Boolean
      favourites: [Int]
    ): [Song]
    tags(searchTerm: String): [String]
    reviewsBySongId(songId: Int!): [Review]
  }

  # Song object
  type Song {
    title: String
    tag: String
    artist: String
    year: Int
    views: Int
    lyrics: String
    id: Int
  }

  # Review object
  type Review {
    _id: ID
    songId: Int
    name: String
    rating: Int
    date: String
    review: String
  }

  # Mutation
  type Mutation {
    create(
      title: String
      tag: String
      artist: String
      year: Int
      views: Int
      lyrics: String
      id: Int
    ): Song
    update(
      title: String
      tag: String
      artist: String
      year: Int
      views: Int
      lyrics: String
      id: Int
    ): Song
    delete(id: ID): Song
    createReview(
      songId: Int
      name: String
      rating: Int
      date: String
      review: String
    ): Review
    deleteReview(id: ID): Review
    deleteAllReviews: Review
  }
`;
