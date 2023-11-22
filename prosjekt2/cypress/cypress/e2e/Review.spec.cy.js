describe('handle reviews', () => {
  it('passes for writing reviews', () => {
    cy.visit('http://it2810-30.idi.ntnu.no/project2/');
    cy.get('.song-card').first().click();
    cy.get('.song-display-title').should('contain', 'Despacito Remix');
    cy.get('.reviews-button').click();
    cy.get('.reviews-header').should('contain', 'Despacito Remix');
    cy.get('.review-box').should('have.length.least', 0);
    cy.get('.reviews-button').click();
    cy.get('#name').type('DespacitoTestReview');
    cy.get('.rating-star').should('have.length', 5).eq(4).click();
    cy.get('.rating-star').eq(0).click();
    cy.get('#review').type('This is a test review.');
    cy.get('.submit-button').click();
    cy.contains('.review-box', 'DespacitoTestReview').should('exist');
    cy.contains('.review-box', 'DespacitoTestReview')
      .parent()
      .find('.delete-button')
      .click();
    cy.contains('.review-box', 'DespacitoTestReview').should('not.exist');

    cy.go(-2);
    cy.get('.song-card').eq(1).should('contain', 'Rap God').click();
    cy.get('.reviews-button', { timeout: 20000 }).click();
    cy.get('.reviews-header', { retries: 3 }).should('contain', 'Rap God');
    cy.contains('.review-box', 'DespacitoTestReview').should('not.exist');
  });

  it('passes for stop writing reviews', () => {
    cy.visit('http://it2810-30.idi.ntnu.no/project2/');
    cy.get('.song-card').eq(3).should('contain', 'Shape of You').click();
    cy.get('.reviews-button').click();
    cy.get('.reviews-header').should('contain', 'Shape of You');
    cy.get('.reviews-button').click();
    cy.get('#name').type('TestForStopWritingReviews');
    cy.get('.rating-star').eq(3).click();
    cy.get('#review').type('Test should not go through.');
    cy.get('.reviews-button').click();
    cy.contains('.review-box', 'TestForStopWritingReviews').should('not.exist');
  });
});
