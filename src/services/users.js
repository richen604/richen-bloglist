import axios from 'axios'

//local development 'http://localhost:3000/api/users'
//prod '/api/users'
let baseUrl
if (process.env.NODE_ENV !== 'production') {
  baseUrl = 'http://localhost:3001/api/users'
} else {
  baseUrl = '/api/users'
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }
