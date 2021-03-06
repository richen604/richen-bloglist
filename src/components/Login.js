/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Login</h2>

      <Form inline id="loginForm" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="usernameInput">Username</Label>
          <Input
            className="login-input"
            id="usernameInput"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Please type your username..."
          />
        </FormGroup>
        <FormGroup>
          <Label for="passwordInput">Password</Label>
          <Input
            className="login-input"
            id="passwordInput"
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

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
