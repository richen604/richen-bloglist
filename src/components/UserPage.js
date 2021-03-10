import React, { useEffect } from 'react'
import Header from './Header'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'
import { getUsers } from '../reducers/usersReducer'

export default function UserPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const users = useSelector((state) => state.users)

  const List = () => (
    <Table striped bordered id="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Blogs</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )

  return (
    <div>
      <Header />
      <h2>Users</h2>
      <List />
    </div>
  )
}
