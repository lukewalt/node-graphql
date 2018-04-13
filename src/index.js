///////////////////////////////////////////////////////////////////////////////////
// NOTES
// - GraphQL root types: Query Mutation Subscription correspond to operations
// - Within these root types are fields and selection sets that define the querys/muts
///////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const AuthPayload = require('./resolvers/AuthPayload');
const Feed = require('./resolvers/Feed');


// context.db : Prisma binding instance which turns the database schema into JavaScript functions can be invoked
const resolvers = {
  Query,
  Mutation,
  Subscription,
  AuthPayload,
  Feed
}


// instance of GQL server with instance of Prisma
const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/public-glitterknight-111/prisma-service/dev',
      secret: 'mysecret123',
      debug: true,
    })
  }),
})

server.express.use("/index", express.static('../public'));

server.start(() => console.log('Server is running on port 4000'));
