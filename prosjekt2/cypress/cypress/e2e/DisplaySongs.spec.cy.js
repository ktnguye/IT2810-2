describe('navigate page', () => {
  it('passes for visiting three different songs', () => {
    cy.visit('http://it2810-30.idi.ntnu.no/project2/');
    cy.get('.song-card').first().click();
    cy.get('.song-display-title').should('contain', 'Despacito Remix');
    cy.get('.back-button').click();
    cy.get('.song-card').eq(1).click();
    cy.get('.song-display-title').should('contain', 'Rap God');
    cy.get('.back-button').click();
    cy.get('.load-more-button').click();
    cy.get('.song-card').should('contain', 'rockstar');
    cy.get('.song-card').should('have.length', 24);
  });

  it('passes for filtering and sorting', () => {
    cy.visit('http://it2810-30.idi.ntnu.no/project2/');
    cy.get('.tag-button').eq(4).click();
    cy.get('.order-button').click();
    cy.contains('Views: Least first').click();
    cy.get('.song-card').first().should('contain', 'Hold Me');
    cy.get('.selected-tag-button').click();
    cy.get('.song-card').first().should('not.contain', 'Hold Me');

    cy.get('.order-button').click();
    cy.contains('Name: Z-A').click();
    cy.get('.song-card').first().should('contain', '﹤3').click();
    cy.get('.song-display-title').should('contain', '﹤3');
  });
});
