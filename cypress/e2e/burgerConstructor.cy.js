describe('Работа с ингредиентами в конструкторе', function() {
  beforeEach(function () {
    // Интерсепт запросов для тестирования
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('Добавление булок в конструктор', function () {
    // 1. Клик по кнопке "Добавить" в секции булок
    cy.get('[data-cy=bun-ingredients]').find('button').click({ force: true });
    // 2. Проверка наличия "Ингредиент 1" в верхней булке
    cy.get('[data-cy=constructor-bun-1]')
      .should('contain.text', 'Ингредиент 1');
    // 3. Проверка наличия "Ингредиент 1" в нижней булке
    cy.get('[data-cy=constructor-bun-2]')
      .should('contain.text', 'Ингредиент 1');
  });

  it('Добавление основных ингредиентов в конструктор', function () {
    // Клик по кнопке добавления основных ингредиентов
    cy.get('[data-cy=mains-ingredients]').find('button').click({ force: true });
    // Клик по кнопке добавления соусов
    cy.get('[data-cy=sauces-ingredients]').find('button').click({ force: true });

    // Проверка наличия ингредиентов в конструкторе
    cy.get('[data-cy=constructor-ingredients]')
      .should('contain.text', 'Ингредиент 2')
      .and('contain.text', 'Ингредиент 4');
  });
});

describe('Тестирование модального окна ингредиентов', function() {
  beforeEach(function () {
    // Интерсепт запросов для тестирования
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('Открытие модального окна с деталями ингредиента', function () {
    // Убедиться, что модальное окно закрыто
    cy.contains('Детали ингредиента').should('not.exist');
    // Клик по ингредиенту для открытия модального окна
    cy.contains('Ингредиент 1').click({ force: true });
    // Проверка отображения модального окна
    cy.contains('Детали ингредиента').should('exist');
    // Проверка наличия информации о правильном ингредиенте
    cy.get('#modals').should('contain.text', 'Ингредиент 1');
  });

  it('Закрытие модального окна по нажатию кнопки', function () {
    // Открытие модального окна
    cy.contains('Ингредиент 1').click({ force: true });
    cy.contains('Детали ингредиента').should('exist');
    // Закрытие модального окна через кнопку
    cy.get('#modals button[aria-label="Закрыть"]').click({ force: true });
    // Проверка закрытия модального окна
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Закрытие модального окна по клику на оверлей', function () {
    // Открытие модального окна
    cy.contains('Ингредиент 1').click({ force: true });
    cy.contains('Детали ингредиента').should('exist');
    // Закрытие модального окна кликом по оверлею
    cy.get('[data-cy=modal-overlay]').click({ force: true });
    // Проверка закрытия модального окна
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('Процесс оформления заказа', function() {
  beforeEach(function () {
    // Интерсепт запросов для тестирования
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' }).as('submitOrder');

    // Настройка моковых данных
    window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));
    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  afterEach(function () {
    // Очистка локального хранилища и cookies
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Оформление заказа', function () {
    // Добавление ингредиентов в конструктор
    cy.get('[data-cy=bun-ingredients]').find('button').click({ force: true });
    cy.get('[data-cy=mains-ingredients]').find('button').click({ force: true });
    cy.get('[data-cy=sauces-ingredients]').find('button').click({ force: true });

    // Оформление заказа
    cy.get('[data-cy=order-sum]').click({ force: true });

    // Проверка отправленных данных заказа
    cy.wait('@submitOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: ['1', '2', '4']
      });

    // Проверка отображения номера заказа
    cy.get('[data-cy=order-number]')
      .should('contain.text', '51882');

    // Закрытие модального окна заказа
    cy.get('#modals button[aria-label="Закрыть"]').click({ force: true });
    cy.contains('[data-cy=order-number]').should('not.exist');

    // Проверка очистки конструктора
    cy.get('[data-cy=constructor]')
      .should('not.contain.text', 'Ингредиент 1');
  });
});
