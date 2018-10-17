const {ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./typeDefs.js')
const resolvers = require('./resolvers.js')
const database = require('./db.js')
const graphqlPath = process.env.GRAPHQL || 'graphql'


server = new ApolloServer ({
    typeDefs,
    resolvers,
    context:{
        db: database
    },
    playground: true,
	introspection:true
})
server.applyMiddleware({ app, path: `/${graphqlPath}` })
server.listen({ port: process.env.PORT || 5000 }).then(({url}) => {
    console.log(`🚀 Server ready at ${url}`)
});