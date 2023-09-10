const trackResolvers = require('./trackResolvers');
const artistResolvers = require('./artistResolvers')
const albumResolvers = require('./albumResolvers')

module.exports = {
  Query: {
    ...trackResolvers.Query,
    ...artistResolvers.Query,
    ...albumResolvers.Query

  },
  Mutation: {
    ...trackResolvers.Mutation,
    ...artistResolvers.Mutation,
    ...albumResolvers.Mutation
  },
};
