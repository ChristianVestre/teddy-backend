const ApolloServer = require('apollo-server');
const typeDefs = require('./typeDefs.js')
const resolvers = require('./resolvers.js')
const database = require('./db.js')

server = new ApolloServer ({
    typeDefs,
    resolvers,
    context:{
        db: database
    }
})

server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`)
});