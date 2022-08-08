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
  link: String
}
type Query {
  me: User
}

type Auth {
  token: ID!
  user: User
}
type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveBook(bookData: BookInput):User
  removeBook(bookId:ID!):User
}
`;
// export the typeDefs
module.exports = typeDefs;