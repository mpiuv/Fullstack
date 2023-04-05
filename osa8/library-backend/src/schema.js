const gql= require ('graphql-tag')

const typeDefs =  `
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Genre {
  value: String!
}

type Author_ {
  name:String!,
  born: Int,
  id: ID!
}

type Book {
  title: String!
  published: Int!
  author:Author_! 
  genres: [String!]!
  id: ID!
}

type AuthorAndBookCount {
 name:String,
 born: Int,
 bookCount: Int
}

type Subscription {
    bookAdded: Book!
  }  

type Query {
  bookCount: Int!,
  authorCount: Int!,
  allBooks(author:String, genre:String): [Book!]!,
  allAuthors: [AuthorAndBookCount!]!,
  me: User
  getFavoriteGenre(username:String!): Genre!
}

type Mutation {
  addBook(
    title: String!,
    author: String!,
    published: Int!,
    genres: [String]!
  ): Book,

  createUser(
    username: String!
    favoriteGenre: String!
  ): User,

  login(
    username: String!
    password: String!
  ): Token
}

type Mutation {
  editAuthor(name: String!, setBornTo: Int!):Author_ 
}
`
module.exports = typeDefs