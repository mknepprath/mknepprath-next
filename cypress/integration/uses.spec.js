describe('Uses', () => {
  before(() => {
    cy.visit('/uses')
  })

  it('should render Uses page', () => {
    cy.get('[data-cy="uses-page"]').should('be.visible')
  })
})