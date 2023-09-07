const { gql } = require("apollo-server");

module.exports = gql`
  type Track {
    name: String
    artists: String
    trackImage: String
    trackUrl: String
  }

  type Artist {
    name: String
    image: String
    description: String
    genre: String
  }

  input TrackInput {
    name: String
    artists: String
  }

  input ArtistInput {
    name: String
    description: String
  }

  type Query {
    track(ID: ID!): Track!
    getTracks(totalTracks: Int): [Track]

    artist(ID:ID!): Artist!
    getArtists(totalArtist: Int): [Artist]
  }

  type Mutation {
    uploadTrack(trackInput: TrackInput): Track!
    deleteTrack(ID: ID!): Boolean
    updateTrack(ID: ID!, trackInput: TrackInput): Boolean

    addArtist(artistInput: ArtistInput):Artist!
    removeArtist(ID: ID!): Boolean
    editArtist(ID: ID!, artistInput: ArtistInput): Boolean
  }
`;
