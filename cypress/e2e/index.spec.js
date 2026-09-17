describe("Home", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render the landing", () => {
    cy.contains("Michael");
    cy.contains("Knepprath");
    cy.get("button[aria-label^='See what']").should("exist");
  });

  it("should open the grid from the hatch", () => {
    cy.get("button[aria-label^='See what']").click();
    cy.location("hash").should("eq", "#grid");
    cy.contains("Index");
  });

  it("should close the grid again", () => {
    cy.get("button[aria-label^='See what']").click();
    cy.contains("Close").click();
    cy.location("hash").should("eq", "");
  });
});
