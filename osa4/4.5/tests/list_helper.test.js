const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe ('total likes', () => {
    test('of empty list is zero', () => {
      expect(listHelper.totalLikes([])).toBe(0)
    })
  
    test('when list has only one blog equals the likes of that', () => {
      expect(listHelper.totalLikes([{
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }])).toBe(5)
    })
  
    test('of a bigger list is calculated right', () => {
      expect(listHelper.totalLikes([{
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Harry Potter Considered Harmful',
        author: 'Yep Booh',
        url: 'http://',
        likes: 5,
        __v: 0
      }])).toBe(10)
    })
  })

  describe ('favorite blog', () => {
    test('of an empty list is undefined', () => {
      expect(listHelper.favoriteBlog([]) === undefined).toBe(true)
    })
  
    test('when list has only one blog equals  that', () => {
      expect(listHelper.favoriteBlog([{
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }])).toEqual({
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5,
      })
    })
  
    test('of a bigger list is calculated right', () => {
      expect(listHelper.favoriteBlog([{
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Harry Potter Considered Harmful',
        author: 'Yep Booh',
        url: 'http://',
        likes: 6,
        __v: 0
      }])).toEqual({
        title: 'Harry Potter Considered Harmful',
        author: 'Yep Booh',
        likes: 6,
      })
    })
  })
 
