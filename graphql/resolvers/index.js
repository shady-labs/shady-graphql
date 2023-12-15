const trackResolvers = require('./trackResolvers');
const artistResolvers = require('./artistResolvers')
const albumResolvers = require('./albumResolvers')
const Artist = require("../../models/Artist");
const Album = require('../../models/Album');
const Track = require('../../models/Track');

module.exports = {
  Query: {
    ...trackResolvers.Query,
    ...artistResolvers.Query,
    ...albumResolvers.Query
  },
  Track: {
    async artists(parent) {
      let result = []
      for(let i=0; i<=parent.artistsId.length; i++) {
        result.push(Artist.findById(parent.artistsId[i]))
      }
      return result;
    },
    async album(parent) {
      let result = []
      result.push(Album.findById(parent.albumId))
      return result;
    }
  },
  Album: {
    async artists(parent) {
      let result = []
      for(let i=0; i<=parent.artistsId.length; i++) {
        result.push(Artist.findById(parent.artistsId[i]))
      }      
      return result;
    },
    async tracks(parent) {
      let result = []
      for(let i=0; i<=parent.tracksId.length; i++) {
        result.push(Artist.findById(parent.tracksId[i]))
      }
      return result;
    }
  },
  Artist: {
    async tracks(parent) {
      //console.log(parent.tracksId[0])
      let result = []
      for(let i=0; i<=parent.tracksId.length; i++) {
        result.push(Track.findById(parent.tracksId[i]))
      }
      return result;
    },
    async albums(parent) {
      let result = []
      for(let i=0; i<=parent.albumsId.length; i++) {
        result.push(Artist.findById(parent.albumsId[i]))
      }
      return result;
    },
  },
  Mutation: {
    ...trackResolvers.Mutation,
    ...artistResolvers.Mutation,
    ...albumResolvers.Mutation
  },
};
