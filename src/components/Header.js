import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser, setUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import {
  Alert,
  Navbar,
  Nav,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import LoginDropdown from './LoginDropdown'

// eslint-disable-next-line react/prop-types
const Notification = ({ message, color }) => {
  if (!message) {
    return null
  }

  return (
    <Alert id="notification" color={color}>
      {message}
    </Alert>
  )
}

const NavComponent = ({ user }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    } else return
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    if (user) {
      dispatch(logoutUser())
    }
  }

  if (user)
    return (
      <div id="nav-container">
        <Navbar light className="header-nav">
          <div id="nav-left-container">
            <FontAwesomeIcon id="nav-logo" icon={faBook} />
            <div id="nav-title">BlogList</div>

            <Nav id="nav-link-container">
              <Link className="nav-links" to="/">
                Home
              </Link>
              <Link className="nav-links" to="/users">
                Users
              </Link>
            </Nav>
          </div>
          <div id="nav-right-container">
            <div id="nav-user-info">Hello {user.name}!</div>
            <Button id="nav-auth-button" type="submit" onClick={handleLogout}>
              Sign Out
            </Button>
          </div>
        </Navbar>
      </div>
    )
  return (
    <div id="nav-container">
      <Navbar light className="header-nav">
        <div id="nav-left-container">
          <FontAwesomeIcon id="nav-logo" icon={faBook} />
          <div id="nav-title">BlogList</div>
          <Nav id="nav-link-container">
            <Link className="nav-links" to="/">
              Home
            </Link>
            <Link className="nav-links" to="/users">
              Users
            </Link>
          </Nav>
        </div>
        <div id="nav-right-container">
          <div style={{ color: '#17a2b8' }} id="nav-user-info">
            Hello Placeholder!
          </div>
          <UncontrolledButtonDropdown
            id="nav-button-dropdown-container"
            nav
            inNavbar
          >
            <DropdownToggle id="nav-auth-button">Sign In</DropdownToggle>
            <DropdownMenu right>
              <LoginDropdown />
              <DropdownItem>Test</DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </div>
      </Navbar>
    </div>
  )
}

export default function Header() {
  const notify = useSelector((state) => state.notify)
  const user = useSelector((state) => state.user)
  return (
    <div>
      <NavComponent {...{ user }} />
      <Notification message={notify.msg} color={notify.color} />
    </div>
  )
}
