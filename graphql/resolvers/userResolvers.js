const Artist = require("../../models/Artist");
const User = require("../../models/User");

module.exports = {
  Mutation: {
    async addUser(_, { userInput: { name, image, isArtist, address, email, region } }) {
    
      const addedArtist = new User({
        name: name,
        image: image,
        isArtist: isArtist,
        address: address,
        region: region,
        email: email
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
  },

  Query: {
    async getUser(_, { ID }) {
      return await User.findById(ID);
    },
    async getAllUsers() {
      return await User.find();
    },
    async getUserByName(_, { name }) {
      if (!name) return await User.find().limit(10);
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
  },
};
