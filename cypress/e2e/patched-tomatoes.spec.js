describe('Patched Tomatoes', () => {
  before(() => {
    cy.visit('/patched-tomatoes')
  })

  it('should render Patched Tomatoes page', () => {
    cy.get('[data-cy="patched-tomatoes-page"]').should('be.visible')
  })
})