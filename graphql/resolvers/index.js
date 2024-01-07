const trackResolvers = require('./trackResolvers');
const artistResolvers = require('./artistResolvers');
const albumResolvers = require('./albumResolvers');
const genreResolvers = require('./genreResolvers');
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
    ...genreResolvers.Query
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
  Album: {
    async artists(parent) {
      let result = []
      for(let i=0; i<=parent.artistsId.length; i++) {
        if(Artist.findById(parent.artistsId[i])!=null)
          result.push(Artist.findById(parent.artistsId[i]))
      }      
      return result;
    },
    async tracks(parent) {
      let result = []
      for(let i=0; i<=parent.tracksId.length; i++) {
        if(Artist.findById(parent.tracksId[i]))
          result.push(Artist.findById(parent.tracksId[i]))
      }
      return result;
    },
    async genreEmbed(parent) {
      if(parent.genre!=null){
        console.log(parent.genre.length)
          return Genre.find({
            $or: [
              {
                name: {
                  $regex: parent.genre
                },
              },  
            ],
        });
        }
      else
        console.log("came here")
        return "null";
    }
  },
  Artist: {
    async tracks(parent) {
      //console.log(parent.tracksId[0])
      let result = []
      for(let i=0; i<=parent.tracksId.length; i++) {
        if(Track.findById(parent.tracksId[i]))
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
    async genreEmbed(parent) {
      if(parent.genre!=null){
        console.log(parent.genre.length)
          return Genre.find({
            $or: [
              {
                name: {
                  $regex: parent.genre
                },
              },  
            ],
        });
        }
      else
        console.log("came here")
        return "null";
    }
  },
  Genre: {
    async tracks (parent) {
      // let result = []
      return Track.find({
        $or: [
          {
            genre: {
              $regex: parent.name
            },
          },
        ],
      });
    },
    async Artists (parent) {
      return Artist.find({
        $or: [
          {
            genre: {
              $regex: parent.name
            },
          },
        ],
      });
    },
    async Albums (parent) {
      return Album.find({
        $or: [
          {
            genre: {
              $regex: parent.name
            },
          },
        ],
      });
    }
  },
  Mutation: {
    ...trackResolvers.Mutation,
    ...artistResolvers.Mutation,
    ...albumResolvers.Mutation,
    ...genreResolvers.Mutation
  },
};
