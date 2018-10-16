const {gql} = require('apollo-server')
typeDefs = gql`
type Query {
    getList(id:ID):[List]
}

type List {
    id: ID!
    name: String
    listpartids: [String]
    getListParts: [ListPart]
    addListPart(part_name:String!, content_text:String!, content_url:String!):ListPart
}

type ListPart {
    id: ID!
    part_name: String!
    content_text: String!
    content_url: String!
} 

type Mutation {
    addList(name:String!):List
}

`;

module.exports = typeDefs

/*
    id: ID!
    name: String


*/ 