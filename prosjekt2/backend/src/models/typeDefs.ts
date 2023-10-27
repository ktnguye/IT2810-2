const gql = require("graphql-tag");

export const typeDefs = gql`
  type Query {
    greetings: String
    welcome(name: String!): String
  }

  # Song object
  type Song {
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
  }
`;
