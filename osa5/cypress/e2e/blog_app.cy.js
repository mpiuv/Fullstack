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
})