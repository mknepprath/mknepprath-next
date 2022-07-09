describe('GIFs', () => {
  before(() => {
    cy.visit('/gifs')
  })

  it('should render GIFs page', () => {
    cy.get('[data-cy="gifs-page"]').should('be.visible')
  })
})