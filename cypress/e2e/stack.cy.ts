/// <reference types="cypress" />
import {
  inputSelector,
  addButtonSelector,
  removeButtonSelector,
  clearButtonSelector,
  circleSelector,
  circleIndexSelector,
  circleBorderSelector,
  changingBorderColor,
  defaultBorderColor,
} from '../../src/constants/selectors';

describe('Проверка компонента Stack', () => {
  beforeEach(() => {
    cy.visit('/stack');

    cy.url().should('include', '/stack');
  });

  it('Проверка, что при пустом инпуте кнопки будут заблокированы', () => {
    cy.get(inputSelector).invoke('prop', 'value').should('eq', '');

    cy.get(addButtonSelector).should('have.attr', 'disabled');
    cy.get(removeButtonSelector).should('have.attr', 'disabled');
    cy.get(clearButtonSelector).should('have.attr', 'disabled');
  });

  it('Проверка добавления элемента', () => {
    // Добавляем первый элемент
    cy.get(inputSelector).type('5');

    cy.get(addButtonSelector).click();

    cy.get(circleSelector)
      .should('contain.text', '5')
      .find(circleIndexSelector)
      .contains(0);

    cy.get(circleSelector)
      .find(circleBorderSelector)
      .should('have.css', 'border', changingBorderColor);

    cy.get(circleSelector)
      .find('[class*=circle_head__]')
      .should('contain.text', 'top');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(circleSelector)
      .find(circleBorderSelector)
      .should('have.css', 'border', defaultBorderColor);

    // Добавляем второй элемент
    cy.get(inputSelector).type('7');

    cy.get(addButtonSelector).click();

    cy.get(circleSelector)
      .eq(1)
      .should('contain.text', '7')
      .find(circleIndexSelector)
      .contains(1);

    cy.get(circleSelector)
      .eq(1)
      .find(circleBorderSelector)
      .should('have.css', 'border', changingBorderColor);

    cy.get(circleSelector)
      .eq(1)
      .find('[class*=circle_head__]')
      .should('contain.text', 'top');

    // Проверяем, что у первого элемента больше нет указателя top
    cy.get(circleSelector)
      .eq(0)
      .find('[class*=circle_head__]')
      .should('contain.text', '');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(circleSelector)
      .eq(1)
      .find(circleBorderSelector)
      .should('have.css', 'border', defaultBorderColor);
  });

  it('Проверка удаления элемента', () => {
    cy.get(inputSelector).type('5');

    cy.get(addButtonSelector).click();

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(inputSelector).type('7');

    cy.get(addButtonSelector).click();

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(removeButtonSelector).click();

    cy.get(circleSelector)
      .eq(1)
      .find(circleBorderSelector)
      .should('have.css', 'border', changingBorderColor);

    cy.get(circleSelector).should('have.length', '1');

    cy.get(circleSelector)
      .find('[class*=circle_head__]')
      .should('contain.text', 'top');
  });

  it('Проверка очистки всех элементов', () => {
    cy.get(inputSelector).type('5');

    cy.get(addButtonSelector).click();

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(inputSelector).type('7');

    cy.get(addButtonSelector).click();

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(clearButtonSelector).click();

    cy.get(circleSelector).should('have.length', '0');
  });
});
