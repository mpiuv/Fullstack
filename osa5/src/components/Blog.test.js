import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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