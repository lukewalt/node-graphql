///////////////////////////////////////////////////////////////////////////////////
// - GraphQL root types: Query Mutation Subscription correspond to operations
// - Within these root types are fields and selection sets that define the querys/muts
///////////////////////////////////////////////////////////////////////////////////

const { GraphQLServer } = require('graphql-yoga');

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
		info: () => `This is a GraphQL API`
	}
}



const server = new GraphQLServer({
	typeDefs,
	resolvers,
})

server.start(() => console.log('Server is running on port 4000'))
