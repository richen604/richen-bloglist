/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { hideNotify, showNotify } from '../reducers/notificationReducer'
import {createBlog} from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

export default function BlogForm({ user }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleTitleChange = (event) => {
    event.preventDefault()
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    event.preventDefault()
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    event.preventDefault()
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(
      createBlog({
        name: user.name,
        title: title,
        author: author,
        url: url,
      }),
    )

    dispatch(showNotify(`A new blog ${title} added!`, 'success'))
    setTimeout(() => {
      dispatch(hideNotify())
    }, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a New Blog</h2>
      <Form inline id="blogForm" onSubmit={addBlog}>
        <FormGroup>
          <Label for="titleInput" hidden>
            Title
          </Label>
          <Input
            className="blog-input"
            id="titleInput"
            value={title}
            name="Title"
            onChange={handleTitleChange}
            placeholder="Title"
          />
        </FormGroup>
        <FormGroup>
          <Label for="authorInput" hidden>
            Author
          </Label>
          <Input
            className="blog-input"
            id="authorInput"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
            placeholder="Author"
          />
        </FormGroup>
        <FormGroup>
          <Label for="urlInput" hidden>
            Url
          </Label>
          <Input
            className="blog-input"
            id="urlInput"
            value={url}
            name="Url"
            onChange={handleUrlChange}
            placeholder="Url"
          />
        </FormGroup>
        <Button type="submit" onClick={addBlog}>
          Add Blog
        </Button>
      </Form>
    </div>
  )
}
