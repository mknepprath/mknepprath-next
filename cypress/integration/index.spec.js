import posts from 'data/posts'

describe('Home', () => {
  before(() => {
    cy.visit('/')
  })

  it('should render homepage', () => {
    posts.slice(0, 5).map((post) => {
      cy.contains(post.title)
    })
  })

  it('should render projects', () => {
    cy.contains('Projects').scrollIntoView().should('be.visible')
  })
})