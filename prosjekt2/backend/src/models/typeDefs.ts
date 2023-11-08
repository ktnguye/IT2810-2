const gql = require('graphql-tag');

export const typeDefs = gql`
  type Query {
    greetings: String
    welcome(name: String!): String
    songs: [Song]
    song(id: ID): Song
    songsByTitle(title: String, index: Int, order: Int, tag: String): [Song]
    tags(title: String): [String]
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
  }
`;
