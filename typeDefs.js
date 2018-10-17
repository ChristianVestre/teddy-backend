const {gql} = require('apollo-server')
typeDefs = gql`

type Query {
    getList(listid:ID):[List]
    getUser(userid:ID):[User]
}

type List {
    listid: ID!
    listname: String
    userid: ID!
    listpartids: [String!]
    titlepicture: String
    tags: [String]
    getListParts: [ListPart]
    addListPart(part_name:String!, content_text:String!, content_url:String!):ListPart
}

type User {
    userid: ID!
    firstname: String!,
    lastname: String!,
    email: String!,
    listids: [String],
    getLists: [List]
}

enum ListType{
    IMAGE
    NESTEDLIST
    TEXT
    VIDEO
}


type ListPart {
    listpartid: ID!
    partname: String!
    contenttext: String!
    contenturl: String!
    parentlistids: [String]
    listid:ID
    type:ListType!
} 

type Mutation {
    addList(name:String!):List
    addUser(firstname:String!,lastname:String!,email:String!):User
}

`;

module.exports = typeDefs

/*
    id: ID!
    name: String


*/ 