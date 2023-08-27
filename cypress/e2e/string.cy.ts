/// <reference types="cypress" />
import {
  inputSelector,
  buttonSelector,
  circleSelector,
  circleBorderSelector,
  defaultBorderColor,
  changingBorderColor,
  modifiedBorderColor,
} from '../../src/constants/selectors';

describe('Проверка компонента string', () => {
  beforeEach(() => {
    cy.visit('/recursion');

    cy.url().should('include', '/recursion');
  });

  it('Проверка, что при пустом инпуте кнопка будет заблокирована', () => {
    cy.get(inputSelector).invoke('prop', 'value').should('eq', '');

    cy.get(buttonSelector).should('have.attr', 'disabled');
  });

  it('Проверка на корректность разворачивания строки', () => {
    cy.get(inputSelector).type('hello');

    cy.get(buttonSelector).click();

    cy.get(circleSelector).should('have.length', 5);

    cy.get(circleSelector)
      .eq(0)
      .should('contain.text', 'h')
      .find(circleBorderSelector)
      .should('have.css', 'border', defaultBorderColor);

    cy.get(circleSelector)
      .eq(1)
      .should('contain.text', 'e')
      .find(circleBorderSelector)
      .should('have.css', 'border', defaultBorderColor);

    cy.get(circleSelector)
      .eq(2)
      .should('contain.text', 'l')
      .find(circleBorderSelector)
      .should('have.css', 'border', defaultBorderColor);

    cy.get(circleSelector)
      .eq(3)
      .should('contain.text', 'l')
      .find(circleBorderSelector)
      .should('have.css', 'border', defaultBorderColor);

    cy.get(circleSelector)
      .eq(4)
      .should('contain.text', 'o')
      .find(circleBorderSelector)
      .should('have.css', 'border', defaultBorderColor);

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get(circleSelector)
      .eq(0)
      .should('contain.text', 'o')
      .find(circleBorderSelector)
      .should('have.css', 'border', modifiedBorderColor);

    cy.get(circleSelector)
      .eq(1)
      .should('contain.text', 'e')
      .find(circleBorderSelector)
      .should('have.css', 'border', changingBorderColor);

    cy.get(circleSelector)
      .eq(2)
      .should('contain.text', 'l')
      .find(circleBorderSelector)
      .should('have.css', 'border', defaultBorderColor);

    cy.get(circleSelector)
      .eq(3)
      .should('contain.text', 'l')
      .find(circleBorderSelector)
      .should('have.css', 'border', changingBorderColor);

    cy.get(circleSelector)
      .eq(4)
      .should('contain.text', 'h')
      .find(circleBorderSelector)
      .should('have.css', 'border', modifiedBorderColor);

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get(circleSelector)
      .eq(0)
      .should('contain.text', 'o')
      .find(circleBorderSelector)
      .should('have.css', 'border', modifiedBorderColor);

    cy.get(circleSelector)
      .eq(1)
      .should('contain.text', 'l')
      .find(circleBorderSelector)
      .should('have.css', 'border', modifiedBorderColor);

    cy.get(circleSelector)
      .eq(2)
      .should('contain.text', 'l')
      .find(circleBorderSelector)
      .should('have.css', 'border', changingBorderColor);

    cy.get(circleSelector)
      .eq(3)
      .should('contain.text', 'e')
      .find(circleBorderSelector)
      .should('have.css', 'border', modifiedBorderColor);

    cy.get(circleSelector)
      .eq(4)
      .should('contain.text', 'h')
      .find(circleBorderSelector)
      .should('have.css', 'border', modifiedBorderColor);

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get(circleSelector)
      .eq(0)
      .should('contain.text', 'o')
      .find(circleBorderSelector)
      .should('have.css', 'border', modifiedBorderColor);

    cy.get(circleSelector)
      .eq(1)
      .should('contain.text', 'l')
      .find(circleBorderSelector)
      .should('have.css', 'border', modifiedBorderColor);

    cy.get(circleSelector)
      .eq(2)
      .should('contain.text', 'l')
      .find(circleBorderSelector)
      .should('have.css', 'border', modifiedBorderColor);

    cy.get(circleSelector)
      .eq(3)
      .should('contain.text', 'e')
      .find(circleBorderSelector)
      .should('have.css', 'border', modifiedBorderColor);

    cy.get(circleSelector)
      .eq(4)
      .should('contain.text', 'h')
      .find(circleBorderSelector)
      .should('have.css', 'border', modifiedBorderColor);
  });
});
