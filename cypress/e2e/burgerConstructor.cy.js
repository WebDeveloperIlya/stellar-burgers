describe('корректная работа при добавлении ингредиентов в конструктор', function() {
  beforeEach(function () {
    // Перехват запросов в тестах
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('Тест добавления ингредиентов', function () {
    // 1. Нажатие кнопки "Добавить" в секции булок
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click({ force: true });
    // 2. Проверка, что "Ингредиент 1" отображается в секции верхней булки
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Ингредиент 1')
      .should('exist');
      // 3. Проверка, что "Ингредиент 1" также отображается в секции нижней булки
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Ингредиент 1')
      .should('exist');
  });

      //Первые ингридиенты из разных категорий по клику
  it('Тест добавления обычных ингредиентов', function () {
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click({ force: true });
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click({ force: true });
    console.log('>>>>>>>>');
    console.log(cy.get('[data-cy=constructor-ingredients]'));
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Ингредиент 2')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Ингредиент 4')
      .should('exist');
  }); 
});

//Тест открытия и закрытия модального окна ингредиента
describe('тест открытия модального окна ингредиентов', function() {
  beforeEach(function () {
    // Перехват запросов в тестах
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('тест открытия модального окна', function () {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Ингредиент 1').click({ force: true });
    cy.contains('Детали ингредиента').should('exist');
    //проверка верного ингредиента в модальном окне
    cy.get('#modals').contains('Ингредиент 1').should('exist');
  });

  it('тест закрытия модального окна по клику на кнопку', function () {
    cy.contains('Ингредиент 1').click({ force: true });
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals button[aria-label="Закрыть"]').click({ force: true });
    //проверка закрытия модального окна
    cy.contains('Детали ингредиента').should('not.exist');
    });

  it('тест закрытия модального окна кликом по оверлею', function () {
    cy.contains('Ингредиент 1').click({ force: true });
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-overlay]').click('left', { force: true });
    //проверка закрытия модального окна
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

// Тест оформления заказа
describe('тест оформления заказа', function() {
beforeEach(function () {
  // Перехват запросов в тестах
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
  cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' }).as('postOrder');

  // Моковые токены
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
  // Добавление ингредиентов в конструктор
  cy.get('[data-cy=bun-ingredients]')
    .contains('Добавить')
    .click({ force: true });
  cy.get('[data-cy=mains-ingredients]')
    .contains('Добавить')
    .click({ force: true });
  cy.get('[data-cy=sauces-ingredients]')
    .contains('Добавить')
    .click({ force: true });

  // Оформление заказа
  cy.get('[data-cy=order-sum]', { timeout: 10000 }).should('be.visible')
    .click({ force: true });

  // Тест корректной отправки ингредиентов
  cy.wait('@postOrder')
    .its('request.body')
    .should('deep.equal', {
      ingredients: ['1', '2', '4']
    });

  // Тест номера заказа
  cy.get('[data-cy=order-number]')
    .contains('51882')
    .should('exist');

  // Тест закрытия модального окна
  cy.get('#modals button[aria-label="Закрыть"]')
    .click({ force: true });
  cy.contains('[data-cy=order-number]').should('not.exist');

  // Тест очистки конструктора
  cy.get('[data-cy=constructor]')
    .contains('Ингредиент 1')
    .should('not.exist');
});
});