import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'reactstrap'
import Header from './Header'

export default function SingleUserPage() {
  const users = useSelector((state) => state.users)

  const id = useParams().id

  const user = users.find((user) => user.id === id)

  if (!user)
    return (
      <div>
        <Header />
        <div>User Not Found</div>
      </div>
    )

  return (
    <div>
      <Header />
      <h2>{user.name}</h2>
      <h4>Added Blogs</h4>

      <ListGroup id="user-bloglist">
      {user.blogs.map(blog => (
        <ListGroupItem key={blog.id}>
          {blog.title}
        </ListGroupItem>
        ))}
      </ListGroup>
      
     
    </div>
  )
}

