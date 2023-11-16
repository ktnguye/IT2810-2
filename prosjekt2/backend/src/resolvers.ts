const { Song } = require('./models/Song.ts');

// GraphQL Resolvers
export const resolvers = {
  Query: {
    greetings: () => 'GraphQL is Awesome',
    welcome: (parent, args) => `Hello ${args.name}`,
    // songs: async () => {
    //   await Song.find();
    // },
    songsByTitle: async (parent, args) => {
      const { title, index, order, tag } = args;

      const sortingOptions = [
        {views: -1, title: 1, year: 1, _id: 1},
        {views: 1, title: 1, year: 1, _id: 1},
        { title: 1, views: -1, year: 1, _id: 1 },
        { title: -1, views: -1, year: -1, _id: 1 },
      ];

      const songs = await Song.find({
        title: { $regex: title, $options: 'i' },
        tag: { $regex: tag, $options: 'i' },
      })
        .sort(sortingOptions[order])
        .skip(index)
        .limit(12);
      return songs || [];
    },
    tags: async (parent) => {
        const tags = await Song.find().distinct('tag');
        return tags || [];  
    },
  },

  Mutation: {
    create: async (parent, args) => {
      const { title, artist, tag, year, album, length, rating } = args;
      const newSong = new Song({
        title,
        artist,
        tag,
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
