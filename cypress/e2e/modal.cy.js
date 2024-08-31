it('should open and close modal window', () => {
  cy.visit('/');
  cy.get('[data-testid="ingredient-item"]').first().click();
  cy.get('[data-testid="modal"]').should('be.visible');
  cy.get('[data-testid="modal-close-button"]').click();
  cy.get('[data-testid="modal"]').should('not.be.visible');
});

it('should display correct ingredient details in modal', () => {
  cy.visit('/');
  cy.get('[data-testid="ingredient-item"]').first().click();
  cy.get('[data-testid="modal"]').should('contain', 'Ingredient Name');
  cy.get('[data-testid="modal"]').should('contain', 'Ingredient Description');
});
