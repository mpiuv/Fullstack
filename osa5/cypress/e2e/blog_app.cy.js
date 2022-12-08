describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login page is visible', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

//  it('user can login', function () {
//    cy.get('input:first').type('mluukkai')
//    cy.get('input:last').type('salainen')
//    cy.contains('login').click()
//  })
})