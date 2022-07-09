describe('Dynoland', () => {
    before(() => {
      cy.visit('/dynoland')
    })
  
    it('should render Dynoland page', () => {
      cy.get('[data-cy="dynoland-page"]').should('be.visible')
    })
  })