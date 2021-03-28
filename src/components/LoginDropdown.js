import React, { useState } from 'react'
import { Button, Form, FormGroup, Input, Label, Alert } from 'reactstrap'
import loginService from '../services/login'
import { hideNotify, showNotify } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import './LoginDropdown.css'

const Notification = ({ notify }) => {
  if (!notify.msg || notify.type !== 'auth-dropdown') return null

  return <Alert color={notify.color}>{notify.msg}</Alert>
}

const LoginDropdown = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const notify = useSelector((state) => state.notify)
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
        showNotify('Wrong Username or Password', 'danger', 'auth-dropdown'),
      )
      setTimeout(() => dispatch(hideNotify()), 5000)
    }
    if (loginUser) dispatch(setUser(loginUser))
  }
  return (
    <div>
      <Notification {...{ notify }} />
      <Form id="login-dropdown-form" onSubmit={handleLogin}>
        <FormGroup className="login-dropdown-group">
          <Label for="username-dropdown-input">Username</Label>
          <br />
          <Input
            className="login-dropdown-input"
            id="username-dropdown-input"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Please type your username..."
          />
        </FormGroup>
        <FormGroup className="login-dropdown-group">
          <Label for="password-dropdown-input">Password</Label>
          <br />
          <Input
            className="login-dropdown-input"
            id="password-dropdown-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Please type your password..."
          />
        </FormGroup>
        <Button type="submit">Login</Button>
      </Form>
      <div id="login-dropdown-text">
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

export default LoginDropdown
