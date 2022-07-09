describe('Writing', () => {
  before(() => {
    cy.visit('/writing')
  })

  it('should render Writing page', () => {
    cy.get('[data-cy="writing-page"]').should('be.visible')
  })
})