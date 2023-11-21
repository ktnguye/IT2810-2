describe('use searchbar', () => {
  it('passes for searching after song title', () => {
    cy.visit('http://localhost:5173/project2');
    cy.get('.search-bar').type('I Drink Wine');
    cy.get('.song-card').first().should('contain', 'I Drink Wine');

    cy.get('.search-bar')
      .clear()
      .should('have.value', '')
      .type('SongThatDoesNotExist');
    cy.get('.song-card').should('have.length', 0);
  });

  it('passes for searching after artist name', () => {
    cy.visit('http://localhost:5173/project2');
    cy.get('.search-bar').type('Drake');
    cy.get('.song-card').first().should('contain', 'Gods Plan');
    cy.get('.tag-button').contains('POP').click();
    cy.get('.song-card').first().should('contain', 'Hotline Bling');

    cy.get('.order-button').click();
    cy.contains('Views: Least first').click();

    cy.get('.song-card').first().should('not.contain', 'Hotline Bling');
    cy.get('.search-bar').clear();
    cy.get('.selected-tag-button').contains('POP').click();
    cy.get('.song-card').first().should('contain', '23');
  });
});
