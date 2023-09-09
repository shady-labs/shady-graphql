const Artist = require("../../models/Artist");
const Track = require("../../models/Track");

module.exports = {
  Mutation: {
    async uploadTrack(
      _,
      { trackInput}
    ) {
      const uploadedTrack = new Track({
        name: trackInput.name,
        // artists: trackInput.artists,
        trackImage: trackInput.trackImage,
        trackUrl: trackInput.trackUrl,
        genre: trackInput.genre,
        duration: trackInput.duration,
      });
      uploadedTrack.artists.push(trackInput.artists)

      const artist = await Artist.findById(trackInput.artists.name);
      //console.log(artist);

      const res = await uploadedTrack.save();
      if(!artist) {
        throw new Error("Artist not found");
      }
      artist.tracks.push(res._id);
      await artist.save();
      console.log(artist);

      
      //Mongo Updated
      // console.log(res._doc);

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
    async getTracksByName(_, { name}) {
      if (!name)
        return await Track.find()
          .limit(10);
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
        .limit(10);
    },
    async getTracksByArtistId(_, { ID}) {
      if (!ID){
        return await Track.find()
          .limit(10);
      }

      const artist = await Artist.findById(ID);
      console.log(artist);
      const tracks=[];
      for(i=0; i<artist.tracks.length;i++){
        tracks.push(Track.findById(artist.tracks[i]));
      }
      return tracks;
    }
  }
};
