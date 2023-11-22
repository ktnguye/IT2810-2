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
    cy.wait(10000);
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

  it('passes for favouriting and filtering', () => {
    cy.visit('http://it2810-30.idi.ntnu.no/project2/');
    // Clicking on the favourite button for the first 4 elements and then reloads the page to check if the favourite button is still filled
    cy.get('.favourite-button').first().click({ force: true });
    cy.get('.favourite-button').eq(1).click({ force: true });
    cy.get('.favourite-button').eq(2).click({ force: true });
    cy.get('.favourite-button').eq(3).click({ force: true });
    cy.reload();
    cy.get('.favourite-button')
      .first()
      .find('img')
      .should('exist')
      .should('have.attr', 'src')
      .and('match', /heart_filled/);
    cy.get('.favourite-button')
      .eq(1)
      .find('img')
      .should('exist')
      .should('have.attr', 'src')
      .and('match', /heart/);
    // Checks if the favourite page contains the correct favourite songs
    cy.get('.tag-button').contains('Favourite').click();
    cy.get('.song-card').should('have.length', 4);
    cy.get('.song-card').first().should('contain', 'Despacito Remix');
    // Tests for filtering on the favourite songs
    cy.get('.tag-button').contains('RAP').click();
    cy.get('.song-card').should('have.length', 2);
    cy.get('.song-card').should('not.contain', 'Despacito Remix');

    // Tests for removing favourite songs
    cy.get('.favourite-button').first().click({ force: true });
    cy.get('.favourite-button').first().click({ force: true });
    cy.get('.song-card').should('have.length', 0);

    // Tests if the songs have been removed from favourites on home page
    cy.get('.selected-tag-button').contains('RAP').click();
    cy.get('.selected-tag-button').contains('Favourite').click();
    cy.get('.favourite-button')
      .eq(1)
      .find('img')
      .should('exist')
      .should('have.attr', 'src')
      .and('match', /heart/);
  });

  it('passes for favouriting inside SongDisplay', () => {
    cy.visit('http://it2810-30.idi.ntnu.no/project2/');
    cy.get('.song-card').first().click();
    cy.get('.favourite-heart-song-display').click({ force: true });
    cy.go(-1);
    cy.get('.favourite-button')
      .first()
      .find('img')
      .should('exist')
      .should('have.attr', 'src')
      .and('include', 'heart_filled');
  });

});
