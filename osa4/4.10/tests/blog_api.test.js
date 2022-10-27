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

test('add a blog',  async () => {
  console.log("Hello")
  const response= await api.post(
    '/api/blogs?title=\"Type%20wars\"&author=\"Robert%20C.%20Martin\"&url=\"http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html\"&likes=2')
  
  console.log(response.status)
  response.
  then(result => {
    console.log(result.body)
    expect(result.status).toBe(201)
    api.get('/api/blogs/').
    then (result2 =>{
      console.log(result2.body)
      expect(result2.body.length).toBe(3) 
    }).
    catch (error => {
      console.log(error)
    })
  }).
  catch(error =>{
    console.log(error)
  })
})

afterAll(() => {
  mongoose.connection.close()
})