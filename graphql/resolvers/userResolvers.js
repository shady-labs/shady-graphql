const Artist = require("../../models/Artist");
const User = require("../../models/User");
const artistResolvers = require("./artistResolvers");

module.exports = {
  Mutation: {
    async addUser(
      _,
      { userInput: { name, image, isArtist, address, email, region } }
    ) {
      const searchResult = User.find({
        $or: [
          {
            address: {
              $regex: ".*" + address + "",
              $options: "i",
            },
          },
        ],
      });
      // console.log((await searchResult).length)
      if ((await searchResult).length == 0) {
        console.log("new user");
        const addedUser = new User({
          name: name,

          image: image,
          isArtist: isArtist,
          address: address,
          region: region,
          email: email,
        });
        const res = await addedUser.save();
        //Mongo Updated
        // console.log(res._doc);
        if (isArtist == true) {
          artistResolvers.Mutation.addArtist(_, {
            artistInput: {
              name: name,
              description: "description",
              genre: "Artist Genre",
            },
          });
        }
        //Getting Tracks
        console.log({
          id: res.id,
          ...res._doc,
        });
        return {
          id: res.id,
          ...res._doc,
        };
      } else {
        console.log("user already exists");
        const res = (
          await User.find({
            $or: [
              {
                address: {
                  $regex: ".*" + address + "",
                  $options: "i",
                },
              },
            ],
          })
        )[0];
        [
          res.name,
          res.email,
          res.image,
          // res.isArtist,
          res.region,
        ] = "null";
        res._id = "null";
        res.id = "null";

        return {
          id: "null",
          ...res._doc,
        };
        // console.log(searchResult)
        // return {
        //   id: searchResult[0].id,
        //   ...searchResult[0]._doc,
        // }
      }
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
      return await User.find({
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
