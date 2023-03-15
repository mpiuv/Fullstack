const mongoose = require('mongoose')
// Mongoose@6.0.0 in use
//mongoose.set('strictQuery', false)
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')

const { ApolloServer} = require('@apollo/server')
const {gql} =require ('graphql-tag')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require ('graphql')

require('dotenv').config()
const jwt = require('jsonwebtoken')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs =  gql`
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
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

type Query {
  bookCount: Int!,
  authorCount: Int!,
  allBooks(author:String, genre:String): [Book!]!,
  allAuthors: [AuthorAndBookCount!]!,
  me: User
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
const { v1: uuid } = require('uuid')
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () =>Author.collection.countDocuments() ,
    allBooks: async (root, args) => {
                              if (args.author!==undefined) {
                                const author=await Author.find({name:args.author})
                                return await Book.find({author:author[0]._id}).populate("author")}
                              else if (args.genre!==undefined)
                                return await Book.find({"genres":{$eq:args.genre}}).populate("author")
                              else {
                                const books=await Book.find({}).populate("author")
                                return books
                              }},
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  AuthorAndBookCount:{
    name: (root) => root.name,
    bookCount: async (root) => {
      let author=await Author.find({name:root.name})
      return (await Book.find({author:author._id})).length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      let author=await Author.find({name:args.author})
      if (author.length===0){
        author=new Author({name:args.author})
        try {
         await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      } else
        author=author[0]

      let book=new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres
      })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      book = await book.populate("author")
      return book
    },
    editAuthor: async (root, args, context) =>{
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
  
      author= Author.find({name:args.name})
      if (author.length===0) return null
      let doc = await Author.findOneAndUpdate({name:args.name}, {born:args.setBornTo});
      doc = await Author.findOne({name:args.name});
      return doc   
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username,favoriteGenre:args.favoriteGenre})
  
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
