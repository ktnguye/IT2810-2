describe('navigate page', () => {
  it('passes for visiting three different songs with two different ways to go to home', () => {
    cy.visit('http://localhost:5173/project2');
    cy.get('.song-card').first().click();
    cy.get('.song-display-title').should('contain', 'Despacito Remix');
    cy.get('.back-button').click();
    cy.get('.song-card').eq(1).click();
    cy.get('.song-display-title').should('contain', 'Rap God');
    cy.get('.side-bar-logo').click();
    cy.get('.song-card').eq(6).click();
    cy.get('.song-display-title').should('contain', 'Bohemian Rhapsody');
  });

  it('passes for filtering and sorting', () => {
    cy.visit('http://localhost:5173/project2');
    cy.get('.tag-button').eq(3).click();
    cy.get('.order-button').click();
    cy.contains('Views: Least first').click();
    cy.get('.song-card').eq(4).should('contain', 'Paranoia').click();
    cy.get('.song-display-title').should('contain', 'Paranoia');
  });
});
