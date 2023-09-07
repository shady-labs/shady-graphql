const trackResolvers = require('./trackResolvers');
const artistResolvers = require('./artistResolvers')

module.exports = {
  Query: {
    ...trackResolvers.Query,
    ...artistResolvers.Query,
  },
  Mutation: {
    ...trackResolvers.Mutation,
    ...artistResolvers.Mutation,
  },
};
