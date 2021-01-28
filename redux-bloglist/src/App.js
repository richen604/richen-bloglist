import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Blog from './components/Blog'
import Login from './components/Login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { hideNotify, showNotify } from './reducers/notificationReducer'
import { setUser, logoutUser } from './reducers/userReducer'
import blogService from './services/blogs'
import loginService from './services/login'

// eslint-disable-next-line react/prop-types
const Notification = ({ message, color }) => {
  if (!message) {
    return null
  }

  return (
    <div className="error" style={{ color: color }}>
      {message}
    </div>
  )
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const notify = useSelector((state) => state.notify)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    } else return
  }, [])

  //BUG State changes when inputting fields
  const user = useSelector((state) => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()
    let loginUser
    try {
      loginUser = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(loginUser),
      )
      blogService.setToken(loginUser.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(showNotify('Wrong Username or Password', 'red'))
      setTimeout(() => dispatch(hideNotify()), 5000)
    }
    if (loginUser) dispatch(setUser(loginUser))
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    if (user) {
      dispatch(logoutUser())
      setUsername('')
      setPassword('')
    }
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
      <BlogForm {...{ user }} />
    </Togglable>
  )

  if (!user) {
    return (
      <div>
        <h1>Blog List Application</h1>
        <Notification message={notify.msg} color={notify.color} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h1>Blog List Application</h1>
      <Notification message={notify.msg} color={notify.color} />
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
          <Blog key={i} {...{ blog, user }} />
        ))}
      </ul>
    </div>
  )
}

export default App
