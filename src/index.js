///////////////////////////////////////////////////////////////////////////////////
// NOTES
// - GraphQL root types: Query Mutation Subscription correspond to operations
// - Within these root types are fields and selection sets that define the querys/muts
///////////////////////////////////////////////////////////////////////////////////

const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')


// context.db : Prisma binding instance which turns the database schema into JavaScript functions can be invoked
const resolvers = {
  Query,
  Mutation,
  AuthPayload
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

server.start(() => console.log('Server is running on port 4000'));

// updateLink: (root, { id, description, url }) => {
//   const foundID = links.findIndex(i => i.id == id);
//   links[foundID] = { id, description, url };
//   return links[foundID]
// },
// deleteLink: (root, { id }) => {
//   const foundID = links.findIndex(i => i.id == id);
//   const link = links[foundID];
//   delete links[foundID];
//   return link;
// }
// updateLink(id: ID!, url: String!, description: String!): Link!
// deleteLink(id: ID!): Link
