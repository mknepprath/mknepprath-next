describe('About', () => {
  before(() => {
    cy.visit('/about')
  })

  it('should render About page', () => {
    cy.get('[data-cy="about-page"]').should('be.visible')
  })

  it("should render Recent Books section", () => {
    cy.contains("Recent Books").scrollIntoView().should("be.visible");
  });

  it("should render Recent Films section", () => {
    cy.contains("Recent Films").scrollIntoView().should("be.visible");
  });

  it("should render Recent Music section", () => {
    cy.contains("Recent Music").scrollIntoView().should("be.visible");
  });
})
