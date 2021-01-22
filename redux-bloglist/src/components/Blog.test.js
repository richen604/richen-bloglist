import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Atomic Design',
    author: 'Brad Frost',
    url: 'https://bradfrost.com/blog/post/atomic-web-design/',
    likes: 4,
  }

  const component = render(<Blog {...{ blog }} />)

  //renders Title
  expect(component.container).toHaveTextContent('Atomic Design')
  //renders Author
  expect(component.container).toHaveTextContent('Brad Frost')

  //Does not render url
  expect(component.container).not.toHaveTextContent('https://bradfrost.com/blog/post/atomic-web-design/')
  //Does not render likes
  expect(component.container).not.toHaveTextContent('4')
})

//Exercise 5.15 cannot be done without a complete refactor of the components
//due to the fact that the onClick handleBlogLike is not a prop passed to the Blog component
/*test('Like button event handler gets called twice when the button is pressed twice', () => {

  const blog = {
    title: 'Atomic Design',
    author: 'Brad Frost',
    url: 'https://bradfrost.com/blog/post/atomic-web-design/',
    likes: 4,
  }

  //because my handleBlogLike is not a prop for the BLog component it requires a complete refactor to allow for this test to work.
  const handleBlogLike = jest.fn()
  const updateBlog = jest.fn()

  let component = render(<Blog handleBlogLike = {handleBlogLike}{...{ blog, updateBlog }} />)

  const viewDetails = component.getByText('View Details')
  fireEvent.click(viewDetails)

  const likeButton = component.container.querySelector('.likeButton')
  const likeOutput = component.container.querySelector('.likeOutput')
  fireEvent.click(likeButton)

  console.log(handleBlogLike.mock)

  expect(handleBlogLike.mock.calls).toHaveLength(1)
})*/

test('Blog component button renders likes and url when clicked', () => {

  const blog = {
    title: 'Atomic Design',
    author: 'Brad Frost',
    url: 'https://bradfrost.com/blog/post/atomic-web-design/',
    likes: 4,
  }

  const component = render(<Blog {...{ blog }} />)

  const button = component.getByText('View Details')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('https://bradfrost.com/blog/post/atomic-web-design/')
  expect(component.container).toHaveTextContent('4')
})
