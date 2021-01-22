import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Blog from './components/Blog'
import Login from './components/Login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

// eslint-disable-next-line react/prop-types
const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error" style={{ color: color }}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorColor, setErrorColor] = useState('green')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => a.likes < b.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong Username or Password')
      setErrorColor('red')
      setTimeout(() => {
        setErrorMessage(null)
        setErrorColor('green')
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    if (user) {
      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
      setUsername('')
      setPassword('')
    }
  }

  const addBlog = (blogObj) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObj).then((returnedBlog) => {
      const blogsCopy = blogs.concat([returnedBlog])
      return setBlogs(blogsCopy.sort((a, b) => a.likes < b.likes))
    })
  }

  const updateBlog = (blogObj) => {
    blogService.update(blogObj.id, blogObj).then((returnedBlog) => {
      const blogsCopy = [...blogs]
      const oldBlog = blogsCopy.find((blog) => blog.id === returnedBlog.id)
      oldBlog.likes = returnedBlog.likes
      return setBlogs(blogsCopy.sort((a, b) => a.likes < b.likes))
    })
  }

  const deleteBlog = (id, userToken) => {
    blogService.remove(id, userToken).then(() => {
      const blogsCopy = [...blogs]
      const newBlogs = blogsCopy.filter((blog) => blog.id !== id)
      return setBlogs(newBlogs.sort((a, b) => a.likes < b.likes))
    })
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <Login
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} {...{ setErrorMessage, user }} />
    </Togglable>
  )

  if (!user) {
    return (
      <div>
        <h1>Blog List Application</h1>
        <Notification message={errorMessage} color={errorColor} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h1>Blog List Application</h1>
      <Notification message={errorMessage} color={errorColor} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button type="submit" onClick={handleLogout}>
            logout
          </button>
          {blogForm()}
        </div>
      )}
      <ul id="blogList">
        {blogs.map((blog, i) => (
          <Blog key={i} {...{ blog, user, updateBlog, deleteBlog }} />
        ))}
      </ul>
    </div>
  )
}

export default App
