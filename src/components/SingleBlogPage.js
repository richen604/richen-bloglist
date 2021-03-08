import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { removeBlog, updateBlog, commentBlog } from '../reducers/blogReducer'
import Header from './Header'

export default function SingleBlogPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const id = useParams().id
  console.log(id)

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

  const handleBlogComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, { content: event.target.commentInput.value }))
  }

  const CommentForm = () => (
    <form id="commentForm" onSubmit={handleBlogComment}>
      Comment: <input id="commentInput" name="content" />{' '}
      <button type="submit">Comment</button>
    </form>
  )

  const CommentDisplay = () => (
    <>
      <h4>Comments</h4>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </>
  )

  if (!blog && id === 'null')
    return (
      <div>
        <Header />
        <div>Blog Not Found</div>
      </div>
    )

  if (blog.user.id === user.id || user.username === 'root')
    return (
      <div>
        <Header />
        <h3>{blog.title}</h3>
        <div>
          <a href={blog.url}>{blog.url}</a> <br />
          Likes: {blog.likes} <button onClick={handleBlogLike}>Like</button>{' '}
          <br />
          {blog.user.name} <br />
          <button onClick={handleBlogDelete}>Delete Blog</button>
        </div>
        <CommentForm />
        <CommentDisplay />
      </div>
    )

  return (
    <div>
      <Header />
      <h3>{blog.title}</h3>
      <div>
        <a href={blog.url}>{blog.url}</a> <br />
        Likes: {blog.likes} <button onClick={handleBlogLike}>Like</button>{' '}
        <br />
        {blog.user.name} <br />
      </div>
      <CommentForm />
      <CommentDisplay />
    </div>
  )
}
