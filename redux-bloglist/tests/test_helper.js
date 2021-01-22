const User = require('../models/user')

const initialUsers = [
  {
    password: 'chan123',
    name: 'Michael Chan',
    username: 'Chan',
  },
  {
    username: 'Edsger',
    author: 'Edsger W. Dijkstra',
    password: 'edsger123',
  },
  {
    username: 'Martin',
    name: 'Robert C. Martin',
    password: 'martin123',
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  usersInDb,
  initialUsers,
}
