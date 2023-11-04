const gql = require("graphql-tag");

export const typeDefs = gql`
  type Query {
    greetings: String
    welcome(name: String!): String
    songs: [Song]
    song(id: ID): Song
    songsByTitle(title: String): [Song]
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
    cover: String
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
      cover: String
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
      cover: String
    ): Song
    delete(id: ID): Song
  }
`;
