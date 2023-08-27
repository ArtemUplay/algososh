describe('Навигация', () => {
  it('Должно перенаправить на страницу со строкой', () => {
    // Переход на начальную страницу
    cy.visit('/');

    // Нажатие на элемент, который приводит к перенаправлению
    cy.get('[data-testid="link-to-string"]').click();

    // Проверка, что URL изменился на ожидаемый маршрут
    cy.url().should('include', '/recursion');

    // Получаем ссылку, которая ведёт обратно на главную страницу
    cy.get('[data-testid="go-back-link"]').click();

    // Проверка, что URL изменился на ожидаемый маршрут
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('Должно перенаправить на страницу с Фибоначчи', () => {
    cy.visit('/');

    cy.get('[data-testid="link-to-fibonacci"]').click();

    cy.url().should('include', '/fibonacci');

    cy.get('[data-testid="go-back-link"]').click();

    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('Должно перенаправить на страницу с сортировкой массива', () => {
    cy.visit('/');

    cy.get('[data-testid="link-to-sorting"]').click();

    cy.url().should('include', '/sorting');

    cy.get('[data-testid="go-back-link"]').click();

    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('Должно перенаправить на страницу со стеком', () => {
    cy.visit('/');

    cy.get('[data-testid="link-to-stack"]').click();

    cy.url().should('include', '/stack');

    cy.get('[data-testid="go-back-link"]').click();

    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('Должно перенаправить на страницу с очередью', () => {
    cy.visit('/');

    cy.get('[data-testid="link-to-queue"]').click();

    cy.url().should('include', '/queue');

    cy.get('[data-testid="go-back-link"]').click();

    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('Должно перенаправить на страницу со списком', () => {
    cy.visit('/');

    cy.get('[data-testid="link-to-list"]').click();

    cy.url().should('include', '/list');

    cy.get('[data-testid="go-back-link"]').click();

    cy.url().should('eq', 'http://localhost:3000/');
  });
});
