describe("About", () => {
  before(() => {
    cy.visit("/about");
  });

  it("should render About page", () => {
    cy.get('[data-cy="about-page"]').should("be.visible");
  });

  // The page hides a section when its upstream feed returns nothing, so the
  // assertion follows the API instead of assuming the data is there.
  const feedSection = (heading, url) => {
    it(`should render ${heading} section in step with its feed`, () => {
      cy.request({ url, failOnStatusCode: false }).then(({ body }) => {
        if (Array.isArray(body) && body.length > 0) {
          cy.contains(heading).scrollIntoView();
          cy.contains(heading).should("be.visible");
        } else {
          cy.contains(heading).should("not.exist");
        }
      });
    });
  };

  feedSection("Recent Books", "/api/v1/books");
  feedSection("Recent Films", "/api/v1/films?min_rating=2");
  feedSection("Recent Music", "/api/v1/music?limit=6");
});
