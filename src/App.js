import React, { useEffect } from 'react'
import './App.css'

import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import blogService from './services/blogs'

import Header from './components/Header'

import HomePage from './components/HomePage'
import BlogList from './components/BlogList'

const App = () => {
  const dispatch = useDispatch()

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

  return (
    <div>
      <Header />
      {user === null ? <HomePage /> : <BlogList />}
    </div>
  )
}

export default App
