import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Blog from './components/Blog'
import Login from './components/Login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { hideNotify, showNotify } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import blogService from './services/blogs'
import loginService from './services/login'
import Header from './components/Header'
import { ListGroup } from 'reactstrap'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

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
      dispatch(showNotify('Wrong Username or Password', 'danger'))
      setTimeout(() => dispatch(hideNotify()), 5000)
    }
    if (loginUser) dispatch(setUser(loginUser))
  }

  const loginForm = () => (
    <Login
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm {...{ user }} />
    </Togglable>
  )

  return (
    <div>
      <Header />

      {user === null ? (
        loginForm()
      ) : (
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
      )}
    </div>
  )
}

export default App
