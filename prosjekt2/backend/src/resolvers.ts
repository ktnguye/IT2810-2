const { Song } = require('./models/Song.ts');

// GraphQL Resolvers
export const resolvers = {
  Query: {
    greetings: () => 'GraphQL is Awesome',
    welcome: (parent, args) => `Hello ${args.name}`,
    // songs: async () => {
    //   await Song.find();
    // },
    songs: async () => {
      const results = await Song.find().sort({ year: 1, title: 1 }).limit(12);
      return results;
    },
    song: async (parent, args) => {
      const song = await Song.findById(args.id);
      return song;
    },
    songsByTitle: async (parent, args) => {
      const { title, index, order, genre } = args;

      const sortingOptions = [
        { title: 1, year: 1, _id: 1 },
        { title: -1, year: -1, _id: 1 },
        { year: -1, title: 1, _id: 1 },
        { year: 1, title: -1, _id: 1 },
      ];

      const genreFilter = genre === '' ? { $regex: genre } : { $all: [genre] };

      const songs = await Song.find({
        title: { $regex: title, $options: 'i' },
        genres: genreFilter,
      })
        .sort(sortingOptions[order])
        .skip(index)
        .limit(12);
      return songs || [];
    },
  },

  Mutation: {
    create: async (parent, args) => {
      const { title, artist, genres, year, album, length, rating } = args;
      const newSong = new Song({
        title,
        artist,
        genres,
        year,
        album,
        length,
        rating,
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
