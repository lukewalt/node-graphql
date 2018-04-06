///////////////////////////////////////////////////////////////////////////////////
// - GraphQL root types: Query Mutation Subscription correspond to operations
// - Within these root types are fields and selection sets that define the querys/muts
///////////////////////////////////////////////////////////////////////////////////

const { GraphQLServer } = require('graphql-yoga');


let links = [
      {
        "id": "0",
        "url": "www.howtographql.com",
        "description": "Fullstack tutorial for GraphQL"
      },
      {
        "id": "3",
        "url": "www.prisma.io",
        "description": "Prisma turns your database into a GraphQL API"
      },
      {
        "id": "4",
        "url": "www.luke.io",
        "description": "writing GraphQL API"
      },
      {
        "id": "5",
        "url": "www.hca.org",
        "description": "where health is"
      }
    ]

let idCount = links.length;
const resolvers = {
	Query: {
		info: () => `This is a GraphQL API`,
		feed: () => links,
	},
  Mutation: {
    post: (root, { description, url }) => {
      const nulink = {
        id: idCount++,
        description,
        url,
      }
      links.push(nulink)
      return nulink
    },
    updateLink: (root, { id, description, url }) => {
      const foundID = links.findIndex(i => i.id == id);
      links[foundID] = { id, description, url };
      return links[foundID]
    },
    deleteLink: (root, { id }) => {
      const foundID = links.findIndex(i => i.id == id);
      const link = links[foundID];
      delete links[foundID];
      return link;
    }
  },
	Link: {
		id: (root) => root.id,
    description: (root) => root.description,
    url: (root) => root.url,
	}
}



const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
})

server.start(() => console.log('Server is running on port 4000'))
