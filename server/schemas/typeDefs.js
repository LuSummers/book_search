// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type User {
  _id: ID
  username: String
  email: String
  bookCount: Int
  savedBooks: [Books]
  
}

type Book {
  bookId: //google id
  authors: String
  description: String
  title: String
  image: Int
  link: [Reaction]
}
type Query {
  me: User
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveBook(authors: String!,  description: String!):User
  removeBook(bookId:ID!):User
}
type Auth {
  token: ID!
  user: User
}
`;
// export the typeDefs
module.exports = typeDefs;