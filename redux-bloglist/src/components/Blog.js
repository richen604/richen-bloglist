/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, removeBlog} from '../reducers/blogReducer'

const BlogDetails = ({ blog, user, setBlogView }) => {
  const dispatch = useDispatch()
  const handleBlogLike = (event) => {
    event.preventDefault()
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
  }

  const handleBlogDelete = (event) => {
    event.preventDefault()
    if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
      dispatch(removeBlog(blog, user.token))
      setBlogView((blogView) => !blogView)
    }
    return
  }

  //Added a return for if the blog was not created by a user
  if (!blog.user || user.id !== blog.user.id) {
    return (
      <>
        <div className="likeOutput">
          Likes: {blog.likes}
          <button className="likeButton" onClick={handleBlogLike}>
            like
          </button>
        </div>
        <div>
          Url:
          <a href={blog.url}>{blog.url}</a>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="likeOutput">
        Likes: {blog.likes}{' '}
        <button className="likeButton" onClick={handleBlogLike}>
          like
        </button>
      </div>
      <div>
        Url:
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        <button onClick={handleBlogDelete}>Delete Blog</button>
      </div>
    </>
  )
}
const Blog = ({ blog, user }) => {
  const [blogView, setBlogView] = useState(false)

  const handleViewChange = (event) => {
    event.preventDefault()
    setBlogView((blogView) => !blogView)
  }

  if (!blogView) {
    return (
      <li
        className="blog"
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ padding: '10px 10px 10px 0px' }}>
          <div>Title: {blog.title}</div>
          Author: {blog.author}
          <button
            id="viewDetailsButton"
            style={{ margin: '10px' }}
            onClick={handleViewChange}
          >
            View Details
          </button>
        </div>
      </li>
    )
  }

  return (
    <li
      className="blog"
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: '10px 10px 10px 0px' }}>
        <div>Title: {blog.title}</div>
        Author: {blog.author}
        <button style={{ margin: '10px' }} onClick={handleViewChange}>
          View Details
        </button>
      </div>
      <BlogDetails {...{ blog, user, setBlogView }} />
    </li>
  )
}

export default Blog
