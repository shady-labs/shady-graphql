const Artist = require("../../models/Artist");

module.exports = {
  Mutation: {
    async addArtist(_, { artistInput: { name, description } }) {
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
    async getArtistsByName(_, { name, pageSize, pageNumber }) {
      if(!pageSize) pageSize = 10;
      if(!pageNumber) pageNumber = 1;
      if(!name) return await Artist.find().skip((pageNumber-1)*pageSize).limit(pageSize);
      return await Artist.find({
        $or: [
          {
            name: {
              "$regex": ".*" + name + "",
              "$options": "i"
            },
        },
        ]
      }).skip((pageNumber-1)*pageSize).limit(pageSize);
    }
  },
};
