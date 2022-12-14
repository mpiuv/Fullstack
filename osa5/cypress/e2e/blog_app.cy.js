describe('Blog ', function() {
  beforeEach( function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = { username: 'root', user: 'Evil', password:'sekret' }
    cy.request('POST','http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function () {
      cy.visit('http://localhost:3000')
      cy.get('input:first').type('root')
      cy.get('input:last').type('sekret')
      cy.contains('login').click()
      cy.contains('root logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('root1')
      cy.get('input:last').type('sekret')
      cy.contains('login').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = { username: 'root', user: 'Evil', password:'sekret' }
      cy.request('POST','http://localhost:3003/api/users', user)
      cy.visit('http://localhost:3000')
      cy.get('input:first').type('root')
      cy.get('input:last').type('sekret')
      cy.contains('login').click()
    })

    it('A blog can be created', function() {
      cy.contains('Create blog').click()
      cy.get('#title').type('Title')
      cy.get('#author').type('Author')
      cy.get('#url').type('http://localhost')
      cy.contains('create').click()
      cy.contains('Title Author')
    })

    it('A blog can be liked', function() {
      cy.contains('Create blog').click()
      cy.get('#title').type('Title')
      cy.get('#author').type('Author')
      cy.get('#url').type('http://localhost')
      cy.contains('create').click()
      cy.contains('Title Author')
      it('A blog can be created', function() {
        cy.contains('Create blog').click()
        cy.get('#title').type('Title')
        cy.get('#author').type('Author')
        cy.get('#url').type('http://localhost')
        cy.contains('create').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

    })

  })
})