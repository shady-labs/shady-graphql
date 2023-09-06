const { gql } = require("apollo-server");

module.exports = gql`
  type Track {
    name: String
    artists: String
    trackImage: String
    trackUrl: String
  }

  input TrackInput {
    name: String
    artists: String
  }

  type Query {
    track(ID: ID!): Track!
    getTracks(totalTracks: Int): [Track]
  }

  type Mutation {
    uploadTrack(trackInput: TrackInput): Track!
    deleteTrack(ID: ID!): Boolean
    updateTrack(ID: ID!, trackInput: TrackInput): Boolean
  }
`;
