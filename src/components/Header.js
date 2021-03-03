import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser, setUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import { Alert, Navbar, Nav } from 'reactstrap'

// eslint-disable-next-line react/prop-types
const Notification = ({ message, color }) => {
  if (!message) {
    return null
  }

  return (
    <Alert id="notification" color={color} >
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
      <Navbar color="light" light expand="md" className="header-nav" style={{ display: 'flex' }}>
        <Nav>
        <Link style={{ padding: '20px' }} to="/">
          Home
        </Link>
        <Link style={{ padding: '20px' }} to="/users">
          Users
        </Link>
        <div
          className="header-nav-user-info"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ padding: '5px' }}>{user.name} has logged in</div>
          <button
            style={{ margin: '5px' }}
            type="submit"
            onClick={handleLogout}
          >
            logout
          </button>
          </div>

        </Nav>
      </Navbar>
    )
  return (
    <Navbar color="light" light expand="md" className="header-nav" style={{ display: 'flex' }}>
      <Nav>
      <Link style={{ padding: '20px' }} to="/">
        Home
      </Link>
      <Link style={{ padding: '20px' }} to="/users">
        Users
      </Link>
      </Nav>
    </Navbar>
  )
}

export default function Header() {
  const notify = useSelector((state) => state.notify)
  const user = useSelector((state) => state.user)
  return (
    <div>
      <h1>Blog List Application</h1>
      <NavComponent {...{ user }} />
      <Notification message={notify.msg} color={notify.color} />
    </div>
  )
}
