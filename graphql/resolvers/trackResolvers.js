const Track = require("../../models/Track");

module.exports = {
  Mutation: {
    async uploadTrack(_, { trackInput: {name, artists, trackImage, trackUrl} }) 
    {
      const uploadedTrack = new Track({
        name: name,
        artists: artists,
        trackImage: "Image",
        trackUrl: "URL"
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
    async updateTrack(_, { ID, trackInput: {name, artists} }) 
    {
      const wasEdited = (
        await Track.updateOne(
          { _id: ID },
          {
            name: name,
            artists: artists
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
  },
};
