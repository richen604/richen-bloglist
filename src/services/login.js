import axios from 'axios'

//local development 'http://localhost:3000/api/login'
//prod '/api/login'
let baseUrl
if (process.env.NODE_ENV === 'test') {
  baseUrl = 'http://localhost:3001/api/login'
}
baseUrl = '/api/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const logout = () => {
  localStorage.removeItem('loggedBlogAppUser')
}

export default { login, logout }
