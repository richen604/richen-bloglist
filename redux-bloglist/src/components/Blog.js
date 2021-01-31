/* eslint-disable react/prop-types */
import React from 'react'
import {Link} from 'react-router-dom'

const Blog = ({ blog }) => {

  return (
    <li
      className="blog"
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: '10px 10px 10px 0px' }}>
          Title: <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
      </div>
    </li>
  )
}

export default Blog
