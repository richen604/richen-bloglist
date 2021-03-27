import React, { useState } from 'react'
import { Button, Form, FormGroup, Input, Label, Alert } from 'reactstrap'
import loginService from '../services/login'
import { hideNotify, showNotify } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'

const LoginDropdown = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const notify = useSelector((state) => state.notify)
  const dispatch = useDispatch()

  const Notification = ({ message, color }) => {
    if (!message) {
      return null
    }

    return (
      <Alert id="notification-dropdown" color={color}>
        {message}
      </Alert>
    )
  }

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
      dispatch(showNotify('Wrong Username or Password', 'danger', 'auth'))
      setTimeout(() => dispatch(hideNotify()), 5000)
    }
    if (loginUser) dispatch(setUser(loginUser))
  }
  return (
    <div>
      <Notification message={notify.msg} color={notify.color} />
      <Form inline id="login-dropdown-form" onSubmit={handleLogin}>
        <FormGroup>
          <Label for="username-dropdown-input">Username</Label>
          <Input
            className="login-dropdown-input"
            id="username-dropdown-input"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Please type your username..."
          />
        </FormGroup>
        <FormGroup>
          <Label for="password-dropdown-input">Password</Label>
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
    </div>
  )
}

export default LoginDropdown
