const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes)
  const sum = likes.reduce((preValue, currValue) => preValue + currValue, 0)
  return sum
}

const favouriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes)
  const mostLikes = Math.max(...likes)

  return blogs.find((blog) => blog.likes === mostLikes)
}

const mostBlogs = (blogs) => {
  const newBlogsArr = blogs.map((blog) => blog.author)
  const mostBlogsArr = newBlogsArr.sort(
    (a, b) =>
      newBlogsArr.filter((v) => v === a).length -
      newBlogsArr.filter((v) => v === b).length
  )
  const mostBlogsAuthor = [...mostBlogsArr].pop()

  const blogCount = mostBlogsArr.filter((author) => author === mostBlogsAuthor)
    .length
  const mostBlogsObj = {
    author: mostBlogsAuthor,
    blogs: blogCount,
  }
  return mostBlogsObj
}

const mostLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes)
  const mostLikes = Math.max(...likes)
  const mostLikedBlog = blogs.find((blog) => blog.likes === mostLikes)
  const totalLikesAuthor = blogs
    .filter((blog) => blog.author === mostLikedBlog.author)
    .map((blog) => blog.likes)
    .reduce((preValue, currValue) => preValue + currValue, 0)

  const mostLikesAuthor = {
    author: mostLikedBlog.author,
    likes: totalLikesAuthor,
  }
  return mostLikesAuthor
}

const nonExistingId = async () => {
  return '432432432432'
}

module.exports = {
  initialBlogs,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
  nonExistingId,
}
