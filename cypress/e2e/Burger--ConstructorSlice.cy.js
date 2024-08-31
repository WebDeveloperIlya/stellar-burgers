describe('Burger Constructor', () => {
  beforeEach(() => {
    // Запустите ваше приложение перед каждым тестом
    cy.visit('/'); // Замените на путь к вашему приложению
  });

  it('should add an ingredient to the constructor', () => {
    // Найдите элемент, который представляет ингредиент
    cy.get('[data-cy="ingredient-tomato"]').click(); // Замените селектор на реальный

    // Убедитесь, что ингредиент добавлен в конструктор
    cy.get('[data-cy="constructor-ingredients"]').should('contain.text', 'Tomato'); // Замените на реальный текст
  });

  it('should add a bun to the constructor', () => {
    // Найдите элемент, который представляет булочку
    cy.get('[data-cy="bun-brioche"]').click(); // Замените селектор на реальный

    // Убедитесь, что булочка добавлена в конструктор
    cy.get('[data-cy="constructor-bun"]').should('contain.text', 'Brioche Bun'); // Замените на реальный текст
  });

  it('should remove an ingredient from the constructor', () => {
    // Добавьте ингредиент
    cy.get('[data-cy="ingredient-tomato"]').click();
    
    // Убедитесь, что ингредиент добавлен
    cy.get('[data-cy="constructor-ingredients"]').should('contain.text', 'Tomato');

    // Удалите ингредиент
    cy.get('[data-cy="remove-ingredient-tomato"]').click(); // Замените селектор на реальный

    // Убедитесь, что ингредиент удален
    cy.get('[data-cy="constructor-ingredients"]').should('not.contain.text', 'Tomato');
  });

  it('should reorder ingredients in the constructor', () => {
    // Добавьте ингредиенты
    cy.get('[data-cy="ingredient-tomato"]').click();
    cy.get('[data-cy="ingredient-lettuce"]').click();
    
    // Проверьте порядок ингредиентов
    cy.get('[data-cy="constructor-ingredients"]').should('contain.text', 'Tomato');
    cy.get('[data-cy="constructor-ingredients"]').should('contain.text', 'Lettuce');

    // Перетащите ингредиенты
    cy.get('[data-cy="ingredient-tomato"]').trigger('mousedown');
    cy.get('[data-cy="ingredient-lettuce"]').trigger('mousemove').trigger('mouseup');

    // Убедитесь, что порядок ингредиентов изменился
    cy.get('[data-cy="constructor-ingredients"]')
      .children()
      .first()
      .should('contain.text', 'Lettuce');
    cy.get('[data-cy="constructor-ingredients"]')
      .children()
      .eq(1)
      .should('contain.text', 'Tomato');
  });

  it('should reset the constructor', () => {
    // Добавьте ингредиенты и булочку
    cy.get('[data-cy="ingredient-tomato"]').click();
    cy.get('[data-cy="bun-brioche"]').click();
    
    // Проверьте, что они добавлены
    cy.get('[data-cy="constructor-ingredients"]').should('contain.text', 'Tomato');
    cy.get('[data-cy="constructor-bun"]').should('contain.text', 'Brioche Bun');

    // Нажмите кнопку сброса
    cy.get('[data-cy="reset-constructor"]').click(); // Замените селектор на реальный

    // Убедитесь, что конструктор сброшен
    cy.get('[data-cy="constructor-ingredients"]').should('be.empty');
    cy.get('[data-cy="constructor-bun"]').should('be.empty');
  });
});
