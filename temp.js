const { ApolloServer, gql } = require('apollo-server-cloud-functions');

// Construct a schema, using GraphQL schema language
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const mongoose = require("mongoose");
require('dotenv').config()
const MONGODB = `${process.env.MONGODB_URL}`;




// Because `NODE_ENV` is a reserved environment variable in Google Cloud
// Functions and it defaults to "production", you need to set the
// `introspection` option to `true` for a UI like Apollo Sandbox or GraphQL
// Playground to work correctly.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});
console.log(MONGODB)
mongoose
        .connect(MONGODB, { useNewUrlParser: true })
        .then(() => {
          console.log("MongoDB Connected");
          //server.applyMiddleware({ app, path: '/somepath' });
          
        })
        .then(() => {
          console.log(`Server running at`);
        });


exports.app = server.createHandler();
