const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const Book = require('./models/Book')
const Author = require('./models/Author')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

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
      getFavoriteGenre: async (root, args) =>{
        const user = await User.findOne({ username: args.username })
        return {value:user.favoriteGenre}
      },
    },
    AuthorAndBookCount:{
      name: (root) => root.name,
      bookCount: async (root) => {
        let author=(await Author.find({name:root.name}))[0]
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
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
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
    },
    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
      },
  }

  module.exports = resolvers