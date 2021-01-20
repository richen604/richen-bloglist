import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('renders content', () => {
  const blog = {
    title: 'Atomic Design',
    author: 'Brad Frost',
    url: 'https://bradfrost.com/blog/post/atomic-web-design/',
    likes: 4,
  }

  const addBlog = jest.fn()
  const setErrorMessage = jest.fn()
  const user = {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNoYW4iLCJpZCI6IjVmZTNhZWE4ZTc1MTExYjQ5MzdiNjI5MSIsImlhdCI6MTYwOTE5NTQ0Nn0.fhDPBxYS_LMvM1NRIJ1D0tcDoYg6lN7pTd8El-nfjAc',
    username: 'Chan',
    name: 'Michael Chan',
    id: '5fe3aea8e75111b4937b6291',
  }

  const component = render(
    <BlogForm createBlog={addBlog} {...{ setErrorMessage, user }} />,
  )

  const blogForm = component.container.querySelector('.blogForm')
  const titleInput = component.container.querySelector('#titleInput')
  const authorInput = component.container.querySelector('#authorInput')
  const urlInput = component.container.querySelector('#urlInput')

  fireEvent.change(titleInput, {
    target: { value: blog.title },
  })
  fireEvent.change(authorInput, {
    target: { value: blog.author },
  })
  fireEvent.change(urlInput, {
    target: { value: blog.url },
  })
  fireEvent.submit(blogForm)

  expect(addBlog.mock.calls).toHaveLength(1)
  console.log(addBlog.mock.calls)
  expect(addBlog.mock.calls[0][0].title).toBe(blog.title)
  expect(addBlog.mock.calls[0][0].author).toBe(blog.author)
  expect(addBlog.mock.calls[0][0].url).toBe(blog.url)
})
