const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

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
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

test('correct number of blogs is returned', async () => {
    const response = await api.get('/api/blogs').expect(200)
    expect(response.body[0].id).toBeDefined()  
})

test('the identifier field is id', async () => {
    const response = await api.get('/api/blogs').expect(200)
    expect(response.body).toHaveLength(2)  
})

test('add a blog',   async () => {
  await api.
  post('/api/blogs').
  send({
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
  }).
  expect(201)
  const result2= await api.get('/api/blogs/')
  expect(result2.body).toHaveLength(3) 
})

test('add likes-field if not given',   async () => {
  await api.
  post('/api/blogs').
  send({
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  }).
  expect(201)
  const result2= await api.get('/api/blogs/')
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
  expect(400)

  await api.
  post('/api/blogs').
  send({
      title: "Type wars",
      author: "Robert C. Martin",
      likes:2
  }).
  expect(400)

  
})

afterAll(() => {
  mongoose.connection.close()
})