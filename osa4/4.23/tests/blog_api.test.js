const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialBlogs = [{
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
  ]
  
  beforeEach(async () => {
    await Blog.deleteMany({})

    let users= await User.find({})
    let blogObject = new Blog({
      _id:initialBlogs[0]._id,
      title:initialBlogs[0].title,
      author:initialBlogs[0].author,
      url:initialBlogs[0].url,
      likes:initialBlogs[0].likes,
      user:users[0]._id
    })
    await blogObject.save()

    blogObject = new Blog({
      _id:initialBlogs[1]._id,
      title:initialBlogs[1].title,
      author:initialBlogs[1].author,
      url:initialBlogs[1].url,
      likes:initialBlogs[1].likes,
      user:users[0]._id
    })
    await blogObject.save()
  })

test('correct number of blogs is returned', async () => {
    const response = await api.get('/api/blogs').
    auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzNmNjYzYzYTU2YjI2MDc3ZDU5ODAwNCIsImlhdCI6MTY2ODA3NjMwOX0.WUbNGojq3l0vyZI4aNA9MHiTXEvkD21uwy-B-nFftSE',{type:'bearer'})    
    expect(response.status).toBe(200)
    expect(response.body[0].id).toBeDefined()  
})

test('the identifier field is id', async () => {
    const response = await api.get('/api/blogs').
    auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzNmNjYzYzYTU2YjI2MDc3ZDU5ODAwNCIsImlhdCI6MTY2ODA3NjMwOX0.WUbNGojq3l0vyZI4aNA9MHiTXEvkD21uwy-B-nFftSE',{type:'bearer'})    
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(2)  
})

test('add a blog',   async () => {
  let users= await User.find({})
  await api.
  post('/api/blogs').
  send({
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      userId: users[0]._id.toString() 
  }).
  set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzNmNjYzYzYTU2YjI2MDc3ZDU5ODAwNCIsImlhdCI6MTY2ODA3NjMwOX0.WUbNGojq3l0vyZI4aNA9MHiTXEvkD21uwy-B-nFftSE').
  expect(200)
  const result2= await api.get('/api/blogs/').
  auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzNmNjYzYzYTU2YjI2MDc3ZDU5ODAwNCIsImlhdCI6MTY2ODA3NjMwOX0.WUbNGojq3l0vyZI4aNA9MHiTXEvkD21uwy-B-nFftSE',{type:'bearer'})
  expect(result2.body).toHaveLength(3) 
})

test('add likes-field if not given',   async () => {
  let users= await User.find({})
  await api.
  post('/api/blogs').
  send({
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      userId: users[0]._id.toString() 
  }).
  set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzNmNjYzYzYTU2YjI2MDc3ZDU5ODAwNCIsImlhdCI6MTY2ODA3NjMwOX0.WUbNGojq3l0vyZI4aNA9MHiTXEvkD21uwy-B-nFftSE').
  expect(200)
  const result2= await api.get('/api/blogs/').
  auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzNmNjYzYzYTU2YjI2MDc3ZDU5ODAwNCIsImlhdCI6MTY2ODA3NjMwOX0.WUbNGojq3l0vyZI4aNA9MHiTXEvkD21uwy-B-nFftSE',{type:'bearer'})    
  expect(result2.body[2].likes).toBeDefined() 
  expect(result2.body[2].likes).toBe(0)
})

test('the title and the url fields are mandatory',   async () => {
  await api.
  post('/api/blogs').
  send({
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes:2
  }).
  set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzNmNjYzYzYTU2YjI2MDc3ZDU5ODAwNCIsImlhdCI6MTY2ODA3NjMwOX0.WUbNGojq3l0vyZI4aNA9MHiTXEvkD21uwy-B-nFftSE').
  expect(400)

  await api.
  post('/api/blogs').
  send({
      title: "Type wars",
      author: "Robert C. Martin",
      likes:2
  }).
  set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzNmNjYzYzYTU2YjI2MDc3ZDU5ODAwNCIsImlhdCI6MTY2ODA3NjMwOX0.WUbNGojq3l0vyZI4aNA9MHiTXEvkD21uwy-B-nFftSE').
  expect(400)
})

test('removal of a blog',   async () => {
  const response= await api.get('/api/blogs/').
  auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzNmNjYzYzYTU2YjI2MDc3ZDU5ODAwNCIsImlhdCI6MTY2ODA3NjMwOX0.WUbNGojq3l0vyZI4aNA9MHiTXEvkD21uwy-B-nFftSE',{type:'bearer'})    

  const blogsAtStart=response.body

  const blogToDelete = blogsAtStart[0]

  const user = await User.findById(blogToDelete.user.id)
  
  const userForToken = {
    username: user.username,
    id: blogToDelete.user.id.toString()
  }
  
  const token = jwt.sign(userForToken, process.env.SECRET)

  let result = await api
    .delete(`/api/blogs/${blogToDelete.id}`).
    auth(token,{type:'bearer'})    
    expect(result.status).toBe(204)

   const response2= await api.get('/api/blogs/').
   auth(token,{type:'bearer'})    
   const blogsAtEnd = response2.body

  expect(blogsAtEnd).toHaveLength(
    blogsAtStart.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).not.toContain(blogToDelete.title)
})

test('updating of a blog',   async () => {
  const response= await api.get('/api/blogs/').
  auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzNmNjYzYzYTU2YjI2MDc3ZDU5ODAwNCIsImlhdCI6MTY2ODA3NjMwOX0.WUbNGojq3l0vyZI4aNA9MHiTXEvkD21uwy-B-nFftSE',{type:'bearer'})    
  const blogsAtStart=response.body
  let blogToUpdate = blogsAtStart[0]
  blogToUpdate.likes=blogToUpdate.likes+1 
  await api.
  post(`/api/blogs/${blogToUpdate.id}`).
  send({
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      likes:blogToUpdate.likes,
      user: blogToUpdate.user.id
  }).
  set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzNmNjYzYzYTU2YjI2MDc3ZDU5ODAwNCIsImlhdCI6MTY2ODA3NjMwOX0.WUbNGojq3l0vyZI4aNA9MHiTXEvkD21uwy-B-nFftSE').
  expect(201)

  const response2= await api.get('/api/blogs/').
  auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzNmNjYzYzYTU2YjI2MDc3ZDU5ODAwNCIsImlhdCI6MTY2ODA3NjMwOX0.WUbNGojq3l0vyZI4aNA9MHiTXEvkD21uwy-B-nFftSE',{type:'bearer'})    
  const blogsAtEnd = response2.body

 expect(blogsAtEnd).toHaveLength(
   blogsAtStart.length 
 )

 const titles = blogsAtEnd.map(r => r.title)
 expect(titles).toContain(blogToUpdate.title)


})

test('adding a blog fails without the authorization',   async () => {
  let users= await User.find({})
  await api.
  post('/api/blogs').
  send({
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      userId: users[0]._id.toString() 
  }).
  expect(401)
})


afterAll(() => {
  mongoose.connection.close()
})