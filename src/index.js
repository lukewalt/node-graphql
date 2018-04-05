///////////////////////////////////////////////////////////////////////////////////
// - GraphQL root types: Query Mutation Subscription correspond to operations
// - Within these root types are fields and selection sets that define the querys/muts
///////////////////////////////////////////////////////////////////////////////////

const { GraphQLServer } = require('graphql-yoga');


let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

const typeDefs = `
type Query {
	info: String!
	feed: [Link!]!
}

type Link {
	id: ID!
	description: String!
	url: String!
}
`


const resolvers = {
	Query: {
		info: () => `This is a GraphQL API`,
		feed: () => links,
	},
	Link: {
		id: (root) => root.id,
    description: (root) => root.description,
    url: (root) => root.url,
	}
}



const server = new GraphQLServer({
	typeDefs,
	resolvers,
})

server.start(() => console.log('Server is running on port 4000'))
