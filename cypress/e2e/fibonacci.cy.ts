/// <reference types="cypress" />
import {
  inputSelector,
  buttonSelector,
  circleSelector,
  circleIndexSelector,
} from '../../src/constants/selectors';

describe('Проверка компонента Фибоначчи', () => {
  beforeEach(() => {
    cy.visit('/fibonacci');

    cy.url().should('include', '/fibonacci');
  });

  it('Проверка, что при пустом инпуте кнопка будет заблокирована', () => {
    cy.get(inputSelector).invoke('prop', 'value').should('eq', '');

    cy.get(buttonSelector).should('have.attr', 'disabled');
  });

  it('Проверка на коректность вычисления чисел Фибоначчи', () => {
    cy.get(inputSelector).type('8');

    cy.get(buttonSelector).click();

    cy.get(circleSelector)
      .eq(0)
      .should('contain.text', '1')
      .find(circleIndexSelector)
      .should('contain.text', '0');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(circleSelector)
      .eq(0)
      .should('contain.text', '1')
      .find(circleIndexSelector)
      .should('contain.text', '0');

    cy.get(circleSelector)
      .eq(1)
      .should('contain.text', '1')
      .find(circleIndexSelector)
      .should('contain.text', '1');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(circleSelector)
      .eq(0)
      .should('contain.text', '1')
      .find(circleIndexSelector)
      .should('contain.text', '0');

    cy.get(circleSelector)
      .eq(1)
      .should('contain.text', '1')
      .find(circleIndexSelector)
      .should('contain.text', '1');

    cy.get(circleSelector)
      .eq(2)
      .should('contain.text', '2')
      .find(circleIndexSelector)
      .should('contain.text', '2');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(circleSelector)
      .eq(0)
      .should('contain.text', '1')
      .find(circleIndexSelector)
      .should('contain.text', '0');

    cy.get(circleSelector)
      .eq(1)
      .should('contain.text', '1')
      .find(circleIndexSelector)
      .should('contain.text', '1');

    cy.get(circleSelector)
      .eq(2)
      .should('contain.text', '2')
      .find(circleIndexSelector)
      .should('contain.text', '2');

    cy.get(circleSelector)
      .eq(3)
      .should('contain.text', '3')
      .find(circleIndexSelector)
      .should('contain.text', '3');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(circleSelector)
      .eq(0)
      .should('contain.text', '1')
      .find(circleIndexSelector)
      .should('contain.text', '0');

    cy.get(circleSelector)
      .eq(1)
      .should('contain.text', '1')
      .find(circleIndexSelector)
      .should('contain.text', '1');

    cy.get(circleSelector)
      .eq(2)
      .should('contain.text', '2')
      .find(circleIndexSelector)
      .should('contain.text', '2');

    cy.get(circleSelector)
      .eq(3)
      .should('contain.text', '3')
      .find(circleIndexSelector)
      .should('contain.text', '3');

    cy.get(circleSelector)
      .eq(4)
      .should('contain.text', '5')
      .find(circleIndexSelector)
      .should('contain.text', '4');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(circleSelector)
      .eq(0)
      .should('contain.text', '1')
      .find(circleIndexSelector)
      .should('contain.text', '0');

    cy.get(circleSelector)
      .eq(1)
      .should('contain.text', '1')
      .find(circleIndexSelector)
      .should('contain.text', '1');

    cy.get(circleSelector)
      .eq(2)
      .should('contain.text', '2')
      .find(circleIndexSelector)
      .should('contain.text', '2');

    cy.get(circleSelector)
      .eq(3)
      .should('contain.text', '3')
      .find(circleIndexSelector)
      .should('contain.text', '3');

    cy.get(circleSelector)
      .eq(4)
      .should('contain.text', '5')
      .find(circleIndexSelector)
      .should('contain.text', '4');

    cy.get(circleSelector)
      .eq(5)
      .should('contain.text', '8')
      .find(circleIndexSelector)
      .should('contain.text', '5');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(circleSelector)
      .eq(0)
      .should('contain.text', '1')
      .find(circleIndexSelector)
      .should('contain.text', '0');

    cy.get(circleSelector)
      .eq(1)
      .should('contain.text', '1')
      .find(circleIndexSelector)
      .should('contain.text', '1');

    cy.get(circleSelector)
      .eq(2)
      .should('contain.text', '2')
      .find(circleIndexSelector)
      .should('contain.text', '2');

    cy.get(circleSelector)
      .eq(3)
      .should('contain.text', '3')
      .find(circleIndexSelector)
      .should('contain.text', '3');

    cy.get(circleSelector)
      .eq(4)
      .should('contain.text', '5')
      .find(circleIndexSelector)
      .should('contain.text', '4');

    cy.get(circleSelector)
      .eq(5)
      .should('contain.text', '8')
      .find(circleIndexSelector)
      .should('contain.text', '5');

    cy.get(circleSelector)
      .eq(6)
      .should('contain.text', '13')
      .find(circleIndexSelector)
      .should('contain.text', '6');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get(circleSelector)
      .eq(0)
      .should('contain.text', '1')
      .find(circleIndexSelector)
      .should('contain.text', '0');

    cy.get(circleSelector)
      .eq(1)
      .should('contain.text', '1')
      .find(circleIndexSelector)
      .should('contain.text', '1');

    cy.get(circleSelector)
      .eq(2)
      .should('contain.text', '2')
      .find(circleIndexSelector)
      .should('contain.text', '2');

    cy.get(circleSelector)
      .eq(3)
      .should('contain.text', '3')
      .find(circleIndexSelector)
      .should('contain.text', '3');

    cy.get(circleSelector)
      .eq(4)
      .should('contain.text', '5')
      .find(circleIndexSelector)
      .should('contain.text', '4');

    cy.get(circleSelector)
      .eq(5)
      .should('contain.text', '8')
      .find(circleIndexSelector)
      .should('contain.text', '5');

    cy.get(circleSelector)
      .eq(6)
      .should('contain.text', '13')
      .find(circleIndexSelector)
      .should('contain.text', '6');

    cy.get(circleSelector)
      .eq(7)
      .should('contain.text', '21')
      .find(circleIndexSelector)
      .should('contain.text', '7');
  });
});
