import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
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