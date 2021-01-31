import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import Header from './Header'

 export default function SingleBlogPage() {
   const dispatch = useDispatch()
   const history = useHistory()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const id = useParams().id

  const blog = blogs.find((blog) => blog.id === id)

  const handleBlogLike = (event) => {
    event.preventDefault()
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
  }

  const handleBlogDelete = (event) => {
    event.preventDefault()
    if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
      dispatch(removeBlog(blog, user.token))
      history.push('/')
    }
    return
  }


  if (!blog) 
    return (
        <div>
          <Header />
          <div>Blog Not Found</div>
        </div>
      )

  if(blog.user.id === user.id) return (
    <div>
          <Header />
          <h3>{blog.title}</h3>
          <div>
              <a href={blog.url}>{blog.url}</a> <br />
              Likes: {blog.likes} <button onClick={() => handleBlogLike()}>Like</button> <br/>
              {blog.user.name} <br />
              <button onClick={handleBlogDelete}>Delete Blog</button>
          </div>
      </div>
  )

  return (
      <div>
          <Header />
          <h3>{blog.title}</h3>
          <div>
              <a href={blog.url}>{blog.url}</a> <br />
              Likes: {blog.likes} <button onClick={handleBlogLike}>Like</button> <br/>
              {blog.user.name} <br />
          </div>
      </div>
  )
}


