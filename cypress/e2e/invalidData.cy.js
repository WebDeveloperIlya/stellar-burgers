beforeEach(() => {
  cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
  cy.intercept('POST', '/api/orders', { fixture: 'order.json' });
});

it('should use mock data for requests', () => {
  cy.visit('/');
  cy.get('[data-testid="order-button"]').click();
  cy.get('[data-testid="order-modal"]').should('contain', 'Order Number');
});
