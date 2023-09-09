const Track = require("../../models/Track");

module.exports = {
  Mutation: {
    async uploadTrack(
      _,
      { trackInput: { name, artists, trackImage, trackUrl, genre, duration } }
    ) {
      const uploadedTrack = new Track({
        name: name,
        artists: artists,
        trackImage: trackImage,
        trackUrl: trackUrl,
        genre: genre,
        duration: duration,
      });

      const res = await uploadedTrack.save();
      //Mongo Updated
      console.log(res._doc);

      //Getting Tracks
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async deleteTrack(_, { ID }) {
      const wasDeleted = (await Track.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },
    async updateTrack(_, { ID, trackInput: { name, artists } }) {
      const wasEdited = (
        await Track.updateOne(
          { _id: ID },
          {
            name: name,
            artists: artists,
          }
        )
      ).modifiedCount;

      return wasEdited;
    },
  },

  Query: {
    async track(_, { ID }) {
      return await Track.findById(ID);
    },
    async getTracks(_, { totalTracks }) {
      return await Track.find().sort({ createdAt: -1 }).limit(totalTracks);
    },
    async getAllTracks() {
      return await Track.find();
    },
    async getTracksByName(_, { name, pageSize, pageNumber }) {
      if (!pageSize) pageSize = 10;
      if (!pageNumber) pageNumber = 1;
      if (!name)
        return await Track.find()
          .skip((pageNumber - 1) * pageSize)
          .limit(pageSize);
      return await Track.find({
        $or: [
          {
            name: {
              $regex: ".*" + name + "",
              $options: "i",
            },
          },
        ],
      })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);
    },
  },
};
