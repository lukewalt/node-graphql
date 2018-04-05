const { GraphQLServer } = require('graphql-yoga');

// GraphQL root types: Query Mutation Subscription
const typeDefs = `
type Query {
	info: String!
}`

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
