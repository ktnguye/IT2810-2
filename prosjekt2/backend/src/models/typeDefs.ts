const gql = require('graphql-tag');

export const typeDefs = gql`
  type Query {
    greetings: String
    welcome(name: String!): String
    songs: [Song]
    song(id: ID): Song
    songsByTitle(title: String, index: Int): [Song]
  }

  # Song object
  type Song {
    id: ID
    title: String
    artist: String
    genres: [String]
    year: Float
    album: String
    length: Float
    rating: Float
  }

  # Mutation
  type Mutation {
    create(
      title: String
      artist: String
      genres: [String]
      year: Float
      album: String
      length: Float
      rating: Float
    ): Song
    update(
      id: ID
      title: String
      artist: String
      genres: [String]
      year: Float
      album: String
      length: Float
      rating: Float
    ): Song
    delete(id: ID): Song
  }
`;
