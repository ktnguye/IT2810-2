const { Song } = require("./models/Song.ts");

// GraphQL Resolvers
export const resolvers = {
  Query: {
    greetings: () => "GraphQL is Awesome",
    welcome: (parent, args) => `Hello ${args.name}`,
    // songs: async () => {
    //   await Song.find();
    // },
    songs: async () => {
      const results = await Song.find().sort({ year: 1 }).limit(12);
      return results;
    },
    next12songs: async (parent, args) => {
      // get 12 songs after the index of the last song in the current list
      const { index } = args;
      const results = await Song.find().skip(index).limit(12);
      return results;
    },
    song: async (parent, args) => {
      const song = await Song.findById(args.id);
      return song;
    },
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
    update: async (parent, args) => {
      const { id } = args;
      const results = await Song.findByIdAndUpdate(id, args);
      return results;
    },
    delete: async (parent, args) => {
      const { id } = args;
      const results = await Song.findByIdAndDelete(id);

      if (!results) {
        throw new Error(`Song with id ${id} does not exist`);
      }

      return results;
    },
  },
};
