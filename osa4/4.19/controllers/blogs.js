const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (request, response) => {
  console.log(request.body)
  let req=request.body
  if(request.body.likes===undefined)
    req={title: request.body.title, author: request.body.author, url:request.body.url, likes:0, userId:request.body.userId}
  if( request.body.title===undefined || request.body.url===undefined){
    response.status(400).end()
    return
  }

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(req.userId)
  const blog = new Blog({
    title:req.title,
    author:req.author,
    url:req.url,
    likes:req.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})


blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/:id', (request, response, next) => {
  try {
    Blog.findByIdAndRemove(request.params.id).
    then(res =>{
      const blog = new Blog(request.body)
      blog
        .save()
        .then(result => {
          response.status(201).json(result)
        })
    }) 
  } catch (exception) {
    next(exception)
  }
})


module.exports = blogsRouter