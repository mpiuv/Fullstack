import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders content', () => {
  const blog = {
    title: 'Blog title',
    author: 'A. Author'
  }

  render(<Blog blog={blog} username='root' removeBlog={jest.fn()}/>)

  const element = screen.getByText('Blog title', { exact: false })
  expect(element).toBeDefined()
})

test('shows the url, the number of likes, user when the view button has been pressed', async() => {
  const blog = {
    title: 'Blog title',
    author: 'A. Author',
    likes: 1,
    url: 'http://localhost',
    user:{ name:'Evil',username:'root' }
  }

  render(<Blog blog={blog} username={'root'} removeBlog={jest.fn()}/>)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  let element = screen.getByText('Blog title', { exact: false })
  expect(element).toBeDefined()
  element = screen.getByText('A. Author', { exact: false })
  expect(element).toBeDefined()
  element = screen.getByText('likes 1', { exact: false })
  expect(element).toBeDefined()
  element = screen.getByText('http://localhost', { exact: false })
  expect(element).toBeDefined()
  element = screen.getByText('Evil', { exact: false })
  expect(element).toBeDefined()
})

test('The like-button is pressed twice and its eventhandler is called twice', async() => {
  const blog = {
    title: 'Blog title',
    author: 'A. Author',
    likes: 1,
    url: 'http://localhost',
    user:{ name:'Evil',username:'root' }
  }

  const mockHandler1 = jest.fn()
  const mockHandler2 = jest.fn()

  render(<Blog blog={blog} username={'root'} removeBlog={mockHandler1} updateBlog={mockHandler2}/>)
  let user = userEvent.setup()
  let button = screen.getByText('view')
  await user.click(button)

  //user = userEvent.setup()
  button = screen.getByText('like')
  await user.click(button)
  await user.click(button)
  expect(mockHandler2.mock.calls).toHaveLength(2)
})

test('When a blog is created, it is checked if the callback function for creation has been called with right arguments',async() => {
  const blog = {
    title: 'Blog title',
    author: 'A. Author',
    url: 'http://localhost'
  }

  const mockHandler = (blogObject) => {
    expect(blogObject.title).toBe('Blog title')
    expect(blogObject.author).toBe('A. Author')
    expect(blogObject.url).toBe('http://localhost')
  }

  render(<BlogForm  createBlog={mockHandler} />)
  let user = userEvent.setup()

  const sendButton = screen.getByText('create')

  const inputs = screen.getAllByRole('textbox')
  await user.type(inputs[0], blog.title)
  await user.type(inputs[1], blog.author)
  await user.type(inputs[2], blog.url)

  await user.click(sendButton)
})