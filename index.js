const {ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./typeDefs.js')
const resolvers = require('./resolvers.js')
const database = require('./db.js')
const express = require('express')
const graphqlPath = process.env.GRAPHQL || 'graphql'
const app = express()
const PORT = process.env.PORT || 8000


//app.use(cors())

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
/*app.listen({ port: process.env.PORT || 5000 }).then(({url}) => {
    console.log(`🚀 Server ready at ${url}`)
});*/
app.listen(PORT, () => console.log(`graphql listening on port ${PORT}`))
