const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)
const helper = require('../utils/blog_helper.js')
const bcrypt = require('bcrypt')
jest.setTimeout(30000)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog title is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map((r) => r.title)
    expect(titles).toContain('Type wars')
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const response = await api.get('/api/blogs')

    const blogToView = response.body[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = 0

    await api.get(`/api/blogs/${invalidId}`).expect(400)
  })

  test('blogs database id is \'id\'', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added, with user info', async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      passwordHash,
      name: 'testName',
    })

    await user.save()
    const newBlog = {
      title: 'Atomic Design',
      author: 'Brad Frost',
      url: 'https://bradfrost.com/blog/post/atomic-web-design/',
    }

    const login = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })

    console.log(login.body.token)

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${login.body.token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    //expect(title).toContain("Atomic Design");*/
  })

  test('blog likes default to 0', async () => {
    const newBlog = {
      title: 'Atomic Design',
      author: 'Brad Frost',
      url: 'https://bradfrost.com/blog/post/atomic-web-design/',
    }

    await api.post('/api/blogs').send(newBlog)

    const response = await api.get('/api/blogs')

    const postedBlog = response.body.find(
      (blog) => blog.title === 'Atomic Design'
    )

    expect(postedBlog.likes).toBe(0)
  })

  test('a blog added with no title or author returns 400', async () => {
    const newBlog = {
      url: 'https://bradfrost.com/blog/post/atomic-web-design/',
      likes: 8,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

describe('deleting blogs on the server', () => {
  test('deleting a blog post by id', async () => {
    let response = await api.get('/api/blogs')
    const thisBlog = response.body[0]

    await api.delete(`/api/blogs/${thisBlog.id}`).expect(204)

    response = await api.get('/api/blogs')
    const ids = response.body.map((r) => r.id)
    expect(response.body).toHaveLength(helper.initialBlogs.length - 1)
    expect(ids).not.toContain(thisBlog.id)
  })
})

describe('updating blogs on the server', () => {
  test('changing likes on a blog post', async () => {
    const response = await api.get('/api/blogs')
    const thisBlog = response.body[0]

    const newBlog = {
      title: thisBlog.title,
      author: thisBlog.author,
      url: thisBlog.url,
      likes: 40,
    }

    await api.put(`/api/blogs/${thisBlog.id}`).send(newBlog).expect(200)
    const newResponse = await api.get(`/api/blogs/${thisBlog.id}`).expect(200)

    expect(newResponse.body).toEqual({
      id: newResponse.body.id,
      title: newResponse.body.title,
      author: newResponse.body.author,
      url: newResponse.body.url,
      likes: 40,
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
