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
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('A blog can be removed', function() {
      cy.contains('Create blog').click()
      cy.get('#title').type('Title')
      cy.get('#author').type('Author')
      cy.get('#url').type('http://localhost')
      cy.contains('create').click()
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('Title Author').should('not.exist')
    })

    it('Blogs are ordered by their likes', function() {
      cy.contains('Create blog').click()
      cy.get('#title').type('The title with the most likes')
      cy.get('#author').type('Author')
      cy.get('#url').type('http://localhost')
      cy.contains('create').click()
      cy.contains('view').click()
      cy.get('#like').click()
      cy.contains('likes 1')
      cy.get('#like').click()
      cy.contains('likes 2')

      cy.contains('Create blog').click()
      cy.get('#title').type('The title with the second most likes')
      cy.get('#author').type('Author2')
      cy.get('#url').type('http://localhost')
      cy.contains('create').click()
      cy.contains('view').click()
      cy.contains('hide').click()
      cy.get('#like').click()
      cy.contains('likes 1')

      cy.visit('http://localhost:3000')
      cy.get('input:first').type('root')
      cy.get('input:last').type('sekret')
      cy.contains('login').click()

      cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
      cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
    })
  })
})