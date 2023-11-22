const { Song } = require('./models/Song.ts');
const { Review } = require('./models/Review.ts');

// GraphQL Resolvers
export const resolvers = {
  
  Query: {
    greetings: () => 'GraphQL is Awesome',
    welcome: (parent, args) => `Hello ${args.name}`,
    
    song: async (parent, args) => {
      const { id } = args;
      const song = await Song.findOne({ id });
      return song || {};
    },

    // Fethces all songs from database. Takes in arguments for sorting
    songsByTitle: async (parent, args) => {
      const { searchTerm, index, order, tag } = args;

      const sortingOptions = [
        { views: -1, title: 1, year: 1, _id: 1 },
        { views: 1, title: -1, year: -1, _id: -1 },
        { title: 1, views: -1, year: 1, _id: 1 },
        { title: -1, views: 1, year: -1, _id: -1 },
      ];

      const songs = await Song.find({
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { artist: { $regex: searchTerm, $options: 'i' } },
        ],
        tag: { $regex: tag, $options: 'i' },
      })
        .sort(sortingOptions[order])
        .skip(index)
        .limit(12);
      return songs || [];
    },

    // Fetches all songs from database. Takes in searchterm as an argument
    tags: async (parent, args) => {
      if (args) {
        const { searchTerm } = args;
        const tags = await Song.find({
          $or: [
            { title: { $regex: searchTerm, $options: 'i' } },
            { artist: { $regex: searchTerm, $options: 'i' } },
          ],
        }).distinct('tag');
        return tags || [];
      } else {
        const tags = await Song.find().distinct('tag');
        return tags || [];
      }
    },

    // Fetches all reviews for a song from database. Takes in songId as an argument
    reviewsBySongId: async (parent, args) => {
      const { songId } = args;
      const reviews = await Review.find({ songId });
      return reviews || [];
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

    createReview: async (parent, args) => {
      const { songId, name, rating, date, review } = args;
      const newReview = new Review({
        songId,
        name,
        rating,
        date,
        review,
      });
      await newReview.save();
      return newReview;
    },
    deleteReview: async (parent, args) => {
      const { id } = args;
      const results = await Review.findByIdAndDelete(id);

      if (!results) {
        throw new Error(`Review with id ${id} does not exist`);
      }

      return results;
    },
    deleteAllReviews: async (parent, args) => {
      const results = await Review.deleteMany({});

      if (!results) {
        throw new Error(`No reviews to delete`);
      }

      return results;
    },
  },
};
