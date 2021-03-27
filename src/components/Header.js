import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser, setUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import { Alert, Navbar, Nav } from 'reactstrap'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

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
        <Navbar light expand="md" className="header-nav">
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
          <div id="nav-spacer" />
          <div id="nav-user-info">Hello {user.name}!</div>
          <button id="nav-auth-button" type="submit" onClick={handleLogout}>
            logout
          </button>
        </Navbar>
      </div>
    )
  return (
    <div id="nav-container">
      <Navbar light expand="md" className="header-nav">
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
      </Navbar>
      <div id="nav-spacer" />
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
