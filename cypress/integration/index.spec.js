import posts from "data/posts";
import { projectLinks } from "data/links";

describe("Home", () => {
  before(() => {
    cy.visit("/");
  });

  it("should render posts", () => {
    posts.slice(0, 5).map((post) => {
      cy.contains(post.title);
    });
  });

  it("should render Projects section", () => {
    cy.contains("Projects").scrollIntoView().should("be.visible");
  });

  it("should render projects", () => {
    projectLinks.map((project) => {
      cy.contains(project.title);
    });
  });

  it("should render Illustrations section", () => {
    cy.contains("Illustrations").scrollIntoView().should("be.visible");
  });
});
