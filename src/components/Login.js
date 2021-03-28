/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import loginService from '../services/login'
import { hideNotify, showNotify } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import './Login.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handlePasswordChange = (event) => {
    event.preventDefault()
    setPassword(event.target.value)
  }

  const handleUsernameChange = (event) => {
    event.preventDefault()
    setUsername(event.target.value)
  }

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
      dispatch(
        showNotify('Wrong Username or Password', 'danger', 'auth-homepage'),
      )
      setTimeout(() => dispatch(hideNotify()), 5000)
    }
    if (loginUser) dispatch(setUser(loginUser))
  }
  return (
    <div id="login-container">
      <h3 id="login-title">Sign In</h3>

      <Form inline id="login-form" onSubmit={handleLogin}>
        <FormGroup className="login-form-group">
          <Label className="login-label" for="username-input">
            Username
          </Label>
          <br />
          <Input
            className="login-input"
            id="username-input"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Please type your username..."
          />
        </FormGroup>
        <FormGroup className="login-form-group">
          <Label className="login-label" for="password-input">
            Password
          </Label>
          <br />
          <Input
            className="login-input"
            id="password-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Please type your password..."
          />
        </FormGroup>
        <Button id="login-button" type="submit">
          Login
        </Button>
      </Form>
      <div id="login-text">
        <strong>Username:</strong> richen <br />
        <strong>Password:</strong> testpassword
        <br />
        <br />
        <strong>Username:</strong> kyle <br />
        <strong>Password:</strong> testpassword
      </div>
    </div>
  )
}

export default LoginForm
