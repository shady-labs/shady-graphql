const trackResolvers = require('./trackResolvers');

module.exports = {
  Query: {
    ...trackResolvers.Query,
  },
  Mutation: {
    ...trackResolvers.Mutation,
  },
};
