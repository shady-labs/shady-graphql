const Artist = require("../../models/Artist");
const Track = require("../../models/Track");

module.exports = {
  Mutation: {
    async addArtist(_, { artistInput: { name, description, genre } }) {
      const addedArtist = new Artist({
        name: name,
        image: "Image",
        description: description,
        genre: "Artist Genre",
      });

      const res = await addedArtist.save();
      //Mongo Updated
      console.log(res._doc);

      //Getting Tracks
      return {
        id: res.id,
        ...res._doc,
      };
    },

    async removeArtist(_, { ID }) {
      const removedArtist = (await Artist.deleteOne({ _id: ID })).deletedCount;
      return removedArtist;
    },

    async editArtist(_, { ID, artistInput: { name, description } }) {
      const wasEdited = (
        await Artist.updateOne(
          { _id: ID },
          {
            name: name,
            description: description,
          }
        )
      ).modifiedCount;

      return wasEdited;
    },
  },

  Query: {
    async artist(_, { ID }) {
      return await Artist.findById(ID);
    },
    async getArtists(_, { totalArtist }) {
      return await Artist.find().sort({ createdAt: -1 }).limit(totalArtist);
    },
    async getAllArtists() {
      return await Artist.find();
    },
    async getArtistsByName(_, { name }) {
      if (!name) return await Artist.find().limit(10);
      return await Artist.find({
        $or: [
          {
            name: {
              $regex: ".*" + name + "",
              $options: "i",
            },
          },
        ],
      }).limit(10);
    },
    async getArtistByTrackId(_, { ID }) {
      if (!ID) return await Artist.find().limit(10);
      track = await Track.findById(ID);
      const Artists = [];
      for (let i = 0; i < track.artistsId.length; i++) {
        Artists.push(await Artist.findById(track.artistsId[i]));
      }
      return Artists;
    },
    async getArtistByTrackName(_, { name }) {
      if (!name) return await Artist.find().limit(10);
      const tracks = await Track.find({
        $or: [
          {
            name: {
              $regex: ".*" + name + "",
              $options: "i",
            },
          },
        ],
      }).limit(10);
      const Artists = [];
      for (let i = 0; i < tracks.length; i++) {
        for (let j = 0; j < tracks[i].artistsId.length; j++) {
          Artists.push(await Artist.findById(tracks[i].artistsId[j]));
        }
      }
      return Artists;
    },
  },
};
