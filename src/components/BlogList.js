import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { ListGroup } from 'reactstrap'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

export default function BlogList() {
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()
  const user = useSelector((state) => state.user)
  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm {...{ user }} />
    </Togglable>
  )
  return (
    <div>
      <h2>Blogs</h2>
      {blogForm()}
      <div>
        <ListGroup id="bloglist-container">
          {blogs.map((blog, i) => (
            <Blog key={i} {...{ blog, user }} />
          ))}
        </ListGroup>
      </div>
    </div>
  )
}
