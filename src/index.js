///////////////////////////////////////////////////////////////////////////////////
// NOTES
// - GraphQL root types: Query Mutation Subscription correspond to operations
// - Within these root types are fields and selection sets that define the querys/muts
///////////////////////////////////////////////////////////////////////////////////

const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = req('prisma-binding');
// context.db : Prisma binding instance which turns the database schema into JavaScript functions can be invoked
const resolvers = {
	Query: {
		info: () => `This is a GraphQL API`,
		feed: (root, args, context, info) => {
      return context.db.query.links({}, info)
    },
	},
  Mutation: {
    post: (root, { description, url }, context, info) => {
      return context.db.mutation.createLink({
        data: {
          description,
          url,
        },
      }, info)
    },
  },
	Link: {
		id: (root) => root.id,
    description: (root) => root.description,
    url: (root) => root.url,
	}
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

server.start(() => console.log('Server is running on port 4000'))

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
