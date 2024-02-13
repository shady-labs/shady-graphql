const trackResolvers = require('./trackResolvers');
const artistResolvers = require('./artistResolvers');
const albumResolvers = require('./albumResolvers');
const genreResolvers = require('./genreResolvers');
const userResolvers = require('./userResolvers');
const Artist = require("../../models/Artist");
const Album = require('../../models/Album');
const Track = require('../../models/Track');
const Genre = require('../../models/genre');
const genre = require('../../models/genre');

module.exports = {
  Query: {
    ...trackResolvers.Query,
    ...artistResolvers.Query,
    ...albumResolvers.Query,
    ...userResolvers.Query
  },
  Mutation: {
    ...trackResolvers.Mutation,
    ...artistResolvers.Mutation,
    ...albumResolvers.Mutation,
    ...userResolvers.Mutation
  },
  Track: {
    async artists(parent) {
      let result = []
      for(let i=0; i<=parent.artistsId.length; i++) {
        console.log(parent.artistsId[i])
        if(parent.artistsId[i]!=null)
          result.push(Artist.findById(parent.artistsId[i]))
      }
      return result;
    },
    async album(parent) {
      let result = []
      if(Album.findById(parent.albumId)!=null)
        result.push(Album.findById(parent.albumId))
      return result;
    },
    async genreEmbed(parent) {
      if(parent.genre!=null){
        console.log(parent.genre.length)
          return Genre.find({
            $or: [
              {
                name: {
                  $regex: parent.genre[0]
                },
              },  
            ],
        });
        }
      else
        console.log("came here")
        return "null";
    },
  },
};
