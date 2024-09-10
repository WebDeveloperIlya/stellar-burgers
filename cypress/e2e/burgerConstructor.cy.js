describe('корректная работа при добавлении ингредиентов в конструктор', function() {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('Тест добавления ингредиентов', function () {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click({ force: true });
    cy.get('[data-cy=constructor-bun-1]').contains('Ингредиент 1').should('exist');
    cy.get('[data-cy=constructor-bun-2]').contains('Ингредиент 1').should('exist');
  });

  it('Тест добавления обычных ингредиентов', function () {
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click({ force: true });
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click({ force: true });
    cy.get('[data-cy=constructor-ingredients]').contains('Ингредиент 2').should('exist');
    cy.get('[data-cy=constructor-ingredients]').contains('Ингредиент 4').should('exist');
  });
});

describe('тест открытия модального окна ингредиентов', function() {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('тест открытия модального окна', function () {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Ингредиент 1').click({ force: true });
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Ингредиент 1').should('exist');
  });

  it('тест закрытия модального окна по клику на кнопку', function () {
    cy.contains('Ингредиент 1').click({ force: true });
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals button[aria-label="Закрыть"]').click({ force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('тест закрытия модального окна кликом по оверлею', function () {
    cy.contains('Ингредиент 1').click({ force: true });
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-overlay]').click('left', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('тест оформления заказа', function() {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' }).as('postOrder');

    window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));
    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('тест оформления заказа', function () {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click({ force: true });
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click({ force: true });
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click({ force: true });

    cy.get('[data-cy=order-sum]', { timeout: 10000 }).should('be.visible').click({ force: true });

    cy.wait('@postOrder').its('request.body').should('deep.equal', {
      ingredients: ['1', '2', '4', '1']
    });

    cy.get('[data-cy=order-number]').contains('51882').should('exist');

    cy.get('#modals button[aria-label="Закрыть"]').click({ force: true });
    cy.contains('[data-cy=order-number]').should('not.exist');

    cy.get('[data-cy=constructor]').contains('Ингредиент 1').should('not.exist');
    cy.get('[data-cy=constructor]').contains('Ингредиент 2').should('not.exist');
    cy.get('[data-cy=constructor]').contains('Ингредиент 4').should('not.exist');
  });
});
