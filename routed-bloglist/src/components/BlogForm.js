/* eslint-disable react/prop-types */
import React, { useState } from 'react'

export default function BlogForm({ createBlog, user, setErrorMessage }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
    createBlog({
      name: user.name,
      title: title,
      author: author,
      url: url,
    })

    setErrorMessage(`A new blog ${title} added!`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>Create a New Blog</h2>
      <form id="blogForm" onSubmit={addBlog}>
        title:
        <input
          id="titleInput"
          value={title}
          name="Title"
          onChange={handleTitleChange}
        />
        author:
        <input
          id="authorInput"
          value={author}
          name="Author"
          onChange={handleAuthorChange}
        />
        url:
        <input
          id="urlInput"
          value={url}
          name="Url"
          onChange={handleUrlChange}
        />
        <button type="submit" onClick={addBlog}>
          Add Blog
        </button>
      </form>
    </div>
  )
}
