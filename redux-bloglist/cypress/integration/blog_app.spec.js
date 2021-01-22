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

const user = {
  name: 'Matti Luukkainen',
  username: 'mluukkai',
  password: 'salainen',
}

const newUser = {
  name: 'test',
  username: 'test',
  password: 'test123',
}

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3001')
  })
  it('Login form is shown', function () {
    cy.contains('Blog List Application')
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
  })

  describe('Login', function () {
    it('user can login with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#usernameInput').type('mluukkai')
      cy.get('#passwordInput').type('salainen')
      cy.get('#loginForm').submit()
      cy.contains('logged in')
    })

    it('user cannot login with incorrect credentials', function () {
      cy.contains('login').click()
      cy.get('#usernameInput').type('mluukkai')
      cy.get('#passwordInput').type('carrot')
      cy.get('#loginForm').submit()
      cy.contains('Wrong Username or Password')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      cy.request('POST', 'http://localhost:3001/api/users', user)
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.visit('http://localhost:3001')
    })

    it('a new blog can be created', function () {
      cy.contains('New Blog').click()
      cy.get('#titleInput').type('This is the Blog Title')
      cy.get('#authorInput').type('This is the Blog Author')
      cy.get('#urlInput').type('This is the Blog Url')
      cy.get('#blogForm').submit()
      cy.contains('This is the Blog Title')
      cy.contains('This is the Blog Author')
    })

    describe('Blog Details', function () {
      beforeEach(function () {
        cy.contains('New Blog').click()
        cy.get('#titleInput').type('This is the Blog Title')
        cy.get('#authorInput').type('This is the Blog Author')
        cy.get('#urlInput').type('This is the Blog Url')
        cy.get('#blogForm').submit()
      })

      it('user can like a blog', function () {
        cy.contains('View Details').click()
        cy.contains('like').click()
        cy.contains('View Details').click()
        cy.contains('1')
      })

      it('user can delete a blog they created', function () {
        cy.visit('http://localhost:3001')
        cy.contains('View Details').click()
        cy.contains('Delete').click()
        cy.get('html').should('not.contain', 'This is the Blog Title')
      })

      it('user cannot delete a blog they did not create', function () {
        cy.request('POST', 'http://localhost:3001/api/users', newUser)
        cy.login(newUser)
        cy.visit('http://localhost:3001')
        cy.contains('This is the Blog Title')
        cy.contains('View Details').click()
        cy.get('html').should('not.contain', 'Delete')
      })
    })
  })
  describe('when adding blogs', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      cy.request('POST', 'http://localhost:3001/api/users', user)
      cy.login({ username: 'mluukkai', password: 'salainen' })
      initialBlogs.forEach((blog) => {
        cy.createBlog(blog)
      })
      cy.visit('http://localhost:3001')
    })
    it('blogs are listed in order of likes', function () {
      cy.visit('http://localhost:3001')
      const likesArr = initialBlogs
        .map((blog) => blog.likes)
        .sort((a, b) => a < b)
      cy.get('li').then((blogs) => {
        //create an iterable array of li elements that contain blog information
        const blogsArr = Object.keys(blogs)
          .map((key) => blogs[key])
          .slice(0, 6)

        blogsArr.forEach((blog, i) => {
          cy.get('#viewDetailsButton').click()
          cy.contains('Likes')
          cy.contains(`${likesArr[i]}`)
        })
      })
    })
  })
})
