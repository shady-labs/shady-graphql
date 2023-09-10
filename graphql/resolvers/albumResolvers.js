const Album = require("../../models/Album");

module.exports = {
  Mutation: {
    async addAlbum(_, { albumInput: { name, albumArt, tracks, genre } }) {
      const addedAlbum = new Album({
        name: name,
        albumArt: albumArt,
        tracks: tracks,
        genre: genre
      });

      const res = await addedAlbum.save();
      //Mongo Updated
      console.log(res._doc);

      //Getting Tracks
      return {
        id: res.id,
        ...res._doc,
      };
    },

    async removeAlbum(_, { ID }) {
      const removedAlbum = (await Album.deleteOne({ _id: ID })).deletedCount;
      return removedAlbum;
    },

    async updateAlbum(
      _,
      { ID, albumInput: { name, albumArt, tracks, genre } }
    ) {
      const wasEdited = (
        await Album.updateOne(
          { _id: ID },
          {
            name: name,
            albumArt: albumArt,
            tracks: tracks,
            genre: genre,
          }
        )
      ).modifiedCount;

      return wasEdited;
    },
  },

  Query: {
    async album(_, { ID }) {
      return await Album.findById(ID);
    },
    async getAlbum(_, { totalAlbum }) {
      return await Album.find().sort({ createdAt: -1 }).limit(totalAlbum);
    },
    async getAllAlbums() {
      return await Album.find();
    },
    async getAlbumsByName(_, { name}) {
      if (!name)
        return await Album.find()
          .limit(10);
      return await Album.find({
        $or: [
          {
            name: {
              $regex: ".*" + name + "",
              $options: "i",
            },
          },
        ],
      })
        .limit(10);
    },
  },
};
