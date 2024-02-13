const Artist = require("../../models/Artist");
const Track = require("../../models/Track");
const Genre = require("../../models/genre");

module.exports = {
  Mutation: {
    async addGenre (_, {genreInput}) {
        const input = new Genre({
            name: genreInput.name
        });
        const res = await input.save();
        return {
            id: res.id,
            ...res._doc,
        }
    }
  },

  Query: {
    async Genre () {
        return Genre.find()
    }
  }
};