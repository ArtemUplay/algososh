/// <reference types="cypress" />
import {
  inputSelector,
  addButtonSelector,
  removeButtonSelector,
  clearButtonSelector,
  circleSelector,
  circleIndexSelector,
  circleBorderSelector,
  circleHeadSelector,
  circleTailSelector,
  defaultBorderColor,
  changingBorderColor,
  modifiedBorderColor,
} from '../../src/constants/selectors';

describe('Проверка компонента Queue', () => {
  beforeEach(() => {
    cy.visit('/queue');

    cy.url().should('include', '/queue');
  });

  it('Проверка, что при пустом инпуте кнопка добавления заблокирована', () => {
    cy.get(inputSelector).invoke('prop', 'value').should('eq', '');

    cy.get(addButtonSelector).should('have.attr', 'disabled');
  });

  it('Проверка правильности добавления элемента в очередь', () => {
    // Добавляем первый элемент
    cy.get(inputSelector).type('55');

    cy.get(addButtonSelector).click();

    cy.get(circleSelector)
      .find(circleBorderSelector)
      .eq(0)
      .should('have.css', 'border', changingBorderColor);

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(circleSelector)
      .eq(0)
      .find(circleBorderSelector)
      .should('have.css', 'border', defaultBorderColor);

    cy.get(circleSelector)
      .eq(0)
      .should('contain.text', '55')
      .find(circleIndexSelector)
      .contains(0);

    cy.get(circleSelector)
      .eq(0)
      .find(circleHeadSelector)
      .should('contain.text', 'head');

    cy.get(circleSelector)
      .eq(0)
      .find(circleTailSelector)
      .should('contain.text', 'tail');

    // Добавляем второй элемент
    cy.get(inputSelector).type('2');

    cy.get(addButtonSelector).click();

    cy.get(circleSelector)
      .find(circleBorderSelector)
      .eq(1)
      .should('have.css', 'border', changingBorderColor);

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(circleSelector)
      .find(circleBorderSelector)
      .eq(1)
      .should('have.css', 'border', defaultBorderColor);

    cy.get(circleSelector)
      .eq(1)
      .should('contain.text', '2')
      .find(circleIndexSelector)
      .contains(1);

    cy.get(circleSelector)
      .eq(1)
      .find(circleTailSelector)
      .should('contain.text', 'tail');

    // Проверяем, что у второго элемента нет указателя head
    cy.get(circleSelector)
      .eq(1)
      .find(circleHeadSelector)
      .should('not.contain.text', 'head');

    // Проверяем, что у первого элемента нет указателя tail
    cy.get(circleSelector)
      .eq(0)
      .find(circleTailSelector)
      .should('not.contain.text', 'tail');

    // Добавляем третий элемент
    cy.get(inputSelector).type('1');

    cy.get(addButtonSelector).click();

    cy.get(circleSelector)
      .find(circleBorderSelector)
      .eq(2)
      .should('have.css', 'border', changingBorderColor);

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(circleSelector)
      .find(circleBorderSelector)
      .eq(2)
      .should('have.css', 'border', defaultBorderColor);

    cy.get(circleSelector)
      .eq(2)
      .should('contain.text', '1')
      .find(circleIndexSelector)
      .contains(2);

    cy.get(circleSelector)
      .eq(2)
      .find(circleTailSelector)
      .should('contain.text', 'tail');

    // Проверяем, что у третьего элемента нет указателя head
    cy.get(circleSelector)
      .eq(2)
      .find(circleHeadSelector)
      .should('not.contain.text', 'head');

    // Проверяем, что у второго элемента нет указателя tail
    cy.get(circleSelector)
      .eq(1)
      .find(circleTailSelector)
      .should('not.contain.text', 'tail');
  });

  it('Проверяем правильность удаления элементов из очереди', () => {
    // Добавим три элемента элемента в очередь
    cy.get(inputSelector).type('2');

    cy.get(addButtonSelector).click();

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(inputSelector).type('5');

    cy.get(addButtonSelector).click();

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(inputSelector).type('7');

    cy.get(addButtonSelector).click();

    // Удаляем элемент
    cy.get(removeButtonSelector).click();

    cy.get(circleSelector)
      .find(circleBorderSelector)
      .eq(0)
      .should('have.css', 'border', changingBorderColor);

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(circleSelector)
      .find(circleBorderSelector)
      .eq(0)
      .should('have.css', 'border', defaultBorderColor);

    cy.get(circleSelector).eq(0).should('contain.text', '');

    // Проверяем, что у первого элемента больше нет указателя head
    cy.get(circleSelector)
      .eq(0)
      .find(circleHeadSelector)
      .should('not.contain.text', 'head');

    // Проверяем, что указатель head появляется у второго элемента
    cy.get(circleSelector)
      .eq(1)
      .find(circleHeadSelector)
      .should('contain.text', 'head');

    // Удаляем ещё один элемент
    cy.get(removeButtonSelector).click();

    cy.get(circleSelector)
      .find(circleBorderSelector)
      .eq(1)
      .should('have.css', 'border', changingBorderColor);

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(circleSelector)
      .find(circleBorderSelector)
      .eq(1)
      .should('have.css', 'border', defaultBorderColor);

    cy.get(circleSelector).eq(1).should('contain.text', '');

    // Проверяем, что у второго элемента больше нет указателя head
    cy.get(circleSelector)
      .eq(1)
      .find(circleHeadSelector)
      .should('not.contain.text', 'head');

    // Проверяем, что указатель head появляется у третьего элемента
    cy.get(circleSelector)
      .eq(2)
      .find(circleHeadSelector)
      .should('contain.text', 'head');
  });

  it('Проверяем поведение кнопки "Очистить"', () => {
    // Добавим три элемента в очередь
    cy.get(inputSelector).type('2');

    cy.get(addButtonSelector).click();

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(inputSelector).type('5');

    cy.get(addButtonSelector).click();

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(inputSelector).type('7');

    cy.get(addButtonSelector).click();

    cy.get(clearButtonSelector).click();

    cy.get(circleSelector).each(($el) => {
      cy.wrap($el).should('contain.text', '');
    });

    cy.get(circleSelector)
      .find(circleHeadSelector)
      .each(($el) => {
        cy.wrap($el).should('contain.text', '');
      });

    cy.get(circleSelector)
      .find(circleTailSelector)
      .each(($el) => {
        cy.wrap($el).should('contain.text', '');
      });
  });
});
