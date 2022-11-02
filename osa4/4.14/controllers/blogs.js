const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  console.log(request.body)
  let req=request.body
  if(request.body.likes===undefined)
    req={title: request.body.title, author: request.body.author, url:request.body.url, likes:0}
  if( request.body.title===undefined || request.body.url===undefined){
    response.status(400).end()
    return
  }
    
  const blog = new Blog(req)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
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