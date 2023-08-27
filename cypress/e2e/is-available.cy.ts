/// <reference types="cypress" />

describe('Поднятие приложения', function () {
  it('Приложение доступно на localhost:3000', function () {
    cy.visit('/');
  });
});
