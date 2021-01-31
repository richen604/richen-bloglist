/* eslint-disable react/prop-types */
import React from 'react'
import {Link} from 'react-router-dom'
import { ListGroupItem } from 'reactstrap'

const Blog = ({ blog }) => {

  return (
    <ListGroupItem
      className="blog"
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: '10px 10px 10px 0px' }}>
          Title: <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
      </div>
    </ListGroupItem>
  )
}

export default Blog
