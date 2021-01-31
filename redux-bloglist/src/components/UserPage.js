import React, { useEffect } from 'react'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'
import {  Link } from 'react-router-dom'

export default function UserPage() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const List = () => (
    <div>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              name: <Link to={`/users/${user.id}`}>{user.name}</Link> blogs:
              {user.blogs.length}
            </li>
          )
        })}
      </ul>
    </div>
  )

  return (
    <div>
      <Header />
      <h2>Users</h2>
      <List />
    </div>
  )
}
