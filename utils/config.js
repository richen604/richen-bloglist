require('dotenv').config()

const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET
const ROOT_PASSWORD = process.env.ROOT_PASSWORD

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.MONGODB_TESTURI
}

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
  ROOT_PASSWORD,
}
