import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'
//local development 'http://localhost:3000/api/blogs'
//prod '/api/blogs'

let token = null

const handle401 = (response) => {
  if (response.status === 401) {
    localStorage.removeItem('loggedBlogAppUser')
  }
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  handle401(response)
  return response.data
}

const create = async (newBlog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newBlog, config)
  handle401(response)
  return response.data
}

const update = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  handle401(response)
  return response.data
}

const remove = async (id, newToken) => {
  const config = { headers: { Authorization: `bearer ${newToken}` } }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  handle401(response)
  return response.data
}

export default { getAll, create, update, setToken, remove }
