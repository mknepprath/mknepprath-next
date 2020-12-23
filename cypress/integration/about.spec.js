describe('About', () => {
  before(() => {
    cy.visit('/about')
  })

  it('should render About page', () => {
    cy.get('[data-cy="about-page"]').should('be.visible')
  })
})