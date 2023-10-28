const trackResolvers = require('./trackResolvers');
const artistResolvers = require('./artistResolvers')
const albumResolvers = require('./albumResolvers')
const userResolvers = require('./userResolvers')

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
};
