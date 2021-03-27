import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'

const LoginDropdown = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <Form inline id="login-dropdown-form" onSubmit={handleSubmit}>
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

LoginDropdown.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginDropdown
