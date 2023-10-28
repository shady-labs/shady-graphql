const { gql } = require("apollo-server");

module.exports = gql`
  type Album {
    name: String
    albumArt: String
    tracks: [String]
    genre: String
  }

  type Track {
    _id: ID!
    name: String
    artistsID: [ID!]
    artistsName: [String!]
    trackImage: String
    trackUrl: String
    genre: [String]
    duration: Int
  }

  type Artist {
    _id: ID!
    name: String
    image: String
    description: String
    genre: String
    tracksId: [ID!]
    tracksName: [String!]
  }

  input AlbumInput {
    name: String
    albumArt: String
    tracks: [String]
    genre: String
  }

  input TrackInput {
    name: String
    trackImage: String
    trackUrl: String
    genre: [String]
    duration: Int
    artistsId: [ID]
  }

  input ArtistInput {
    name: String
    image: String
    description: String
    genre: String
  }

  type Query {
    album(ID: ID!): Album!
    getAlbum(totalAlbums: Int): [Album]
    getAllAlbums: [Album]!
    getAlbumsByName(name: String): [Track]

    track(ID: ID!): Track!
    getTracks(totalTracks: Int): [Track]
    getAllTracks: [Track]!
    getTracksByName(name: String): [Track]
    getTracksByArtistId(ID: ID!): [Track]
    getTracksByArtistName(name: String!): [Track]

    artist(ID: ID!): Artist!
    getArtists(totalArtist: Int): [Artist]
    getAllArtists: [Artist]
    getArtistsByName(name: String): [Artist]
    getArtistByTrackId(ID: ID!): [Artist]
    getArtistByTrackName(name: String!): [Artist]
  }

  type Mutation {
    addAlbum(albumInput: AlbumInput): Album!
    removeAlbum(ID: ID!): Boolean
    updateAlbum(ID: ID!, albumInput: AlbumInput): Boolean

    uploadTrack(trackInput: TrackInput): Track!
    deleteTrack(ID: ID!): Boolean
    updateTrack(ID: ID!, trackInput: TrackInput): Boolean

    addArtist(artistInput: ArtistInput): Artist!
    removeArtist(ID: ID!): Boolean
    editArtist(ID: ID!, artistInput: ArtistInput): Boolean
  }
`;
