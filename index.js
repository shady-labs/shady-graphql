const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

require('dotenv').config()

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const MONGODB = `${process.env.MONGODB_URL}`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 5500 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
