const { Song } = require("./models/Song");

// GraphQL Resolvers
export const resolvers = {
  Query: {
    greetings: () => "GraphQL is Awesome",
    welcome: (parent, args) => `Hello ${args.name}`,
  },

  Mutation: {
    create: async (parent, args) => {
      const { title, artist, genres, year, album, length, rating, cover } =
        args;
      const newSong = new Song({
        title,
        artist,
        genres,
        year,
        album,
        length,
        rating,
        cover,
      });
      await newSong.save();
      return newSong;
    },
  },
};
