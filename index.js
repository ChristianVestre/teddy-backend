const {ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./typeDefs.js')
const resolvers = require('./resolvers.js')
const database = require('./db.js')

server = new ApolloServer ({
    typeDefs,
    resolvers,
    context:{
        db: database
    },
    playground: {
		endpoint: `/graphql`,
		settings: {
      		'editor.theme': 'dark'
    	}
	},
	introspection:true
})

server.listen({ port: process.env.PORT || 5000 }).then(({url}) => {
    console.log(`🚀 Server ready at ${url}`)
});