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
  const blog = new Blog(req)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter