const trackResolvers = require('./trackResolvers');
const artistResolvers = require('./artistResolvers')
const albumResolvers = require('./albumResolvers')
const UserResolvers = require('./userResolvers')

module.exports = {
  Query: {
    ...trackResolvers.Query,
    ...artistResolvers.Query,
    ...albumResolvers.Query,
    ...UserResolvers.Query
  },
  Mutation: {
    ...trackResolvers.Mutation,
    ...artistResolvers.Mutation,
    ...albumResolvers.Mutation,
    ...UserResolvers.Mutation
  },
};
