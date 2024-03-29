const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    comments: [],
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    comments: [],
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    comments: [],
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    comments: [],
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    comments: [],
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    comments: [],
  },
]

const newUser = {
  name: 'test',
  username: 'test',
  password: 'test123',
}

const users = [
  {
    name: 'richen',
    username: 'richen',
    password: 'testpassword',
  },
  {
    name: 'Kyle',
    username: 'kyle',
    password: 'testpassword',
  },
]

describe('Blog app', function () {
  describe('Login', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      cy.request('POST', 'http://localhost:3001/api/users', newUser)
      cy.visit('http://localhost:3001')
    })
    it('Login form is shown', function () {
      cy.contains('Welcome to BlogList')
      cy.contains('Sign In').click({ force: true })
      cy.contains('Username')
      cy.contains('Password')
    })

    it('login form can be opened', function () {
      cy.contains('Sign In').click({ force: true })
    })
    it('user can login with correct credentials', function () {
      cy.contains('Sign In').click({ force: true })
      cy.get('#username-dropdown-input').type('test', { force: true })
      cy.get('#password-dropdown-input').type('test123', { force: true })
      cy.get('#login-dropdown-form').submit()
      cy.contains('Hello test!')
    })

    it('user cannot login with incorrect credentials', function () {
      cy.contains('Sign In').click({ force: true })
      cy.get('#username-dropdown-input').type('richen', { force: true })
      cy.get('#password-dropdown-input').type('carrot', { force: true })
      cy.get('#login-dropdown-form').submit()
      cy.contains('Wrong Username or Password')
    })
  })

  describe('when logged in', function () {
    before(function () {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      cy.request('POST', 'http://localhost:3001/api/users', newUser)
      cy.login({ username: newUser.username, password: newUser.password })
      cy.visit('http://localhost:3001')
    })

    it('a new blog can be created', function () {
      cy.contains('New Blog').click()
      cy.get('#titleInput').type('This is the Blog Title')
      cy.get('#authorInput').type('This is the Blog Author')
      cy.get('#urlInput').type('This is the Blog Url')
      cy.get('#blogForm').submit()
      cy.contains('This is the Blog Title')
    })
  })

  describe('default content setup', function () {
    before(function () {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      users.forEach((thisUser) => {
        cy.request('POST', 'http://localhost:3001/api/users', thisUser)
      })
      cy.login({ username: users[0].username, password: users[0].password })
      cy.visit('http://localhost:3001')
    })

    it('adding default blogs', function () {
      initialBlogs.forEach((blog) => {
        cy.contains('New Blog').click()
        cy.get('#titleInput').type(blog.title)
        cy.get('#authorInput').type(blog.author)
        cy.get('#urlInput').type(blog.url)
        cy.get('#blogForm').submit()
        cy.visit('http://localhost:3001')
      })
    })
  })
})

/*

blog details testing to be implemented later

describe('Blog Details', function () {
      beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.request('POST', 'http://localhost:3001/api/users', user)
        cy.login({ username: 'mluukkai', password: 'salainen' })
        cy.visit('http://localhost:3001')
        cy.contains('New Blog').click()
        cy.get('#titleInput').type('This is the Blog Title')
        cy.get('#authorInput').type('This is the Blog Author')
        cy.get('#urlInput').type('This is the Blog Url')
        cy.get('#blogForm').submit()
        cy.visit('http://localhost:3001')
      })

      it('user can like a blog', function () {
        cy.visit('http://localhost:3001')
        cy.get('.blog-link').first().click()
        cy.contains('Like').click()
        cy.contains('1')
      })

      it('user can delete a blog they created', function () {
        cy.visit('http://localhost:3001')
        cy.get('.blog-link').first().click()
        cy.contains('Delete Blog').click()
        cy.get('html').should('not.contain', 'This is the Blog Title')
      })

      it('user cannot delete a blog they did not create', function () {
        cy.request('POST', 'http://localhost:3001/api/users', newUser)
        cy.login(newUser)
        cy.visit('http://localhost:3001')
        cy.contains('This is the Blog Title').click()
        cy.get('html').should('not.contain', 'Delete')
      })
    })



*/
