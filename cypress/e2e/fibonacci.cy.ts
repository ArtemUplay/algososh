/// <reference types="cypress" />

describe('Проверка компонента Фибоначчи', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="link-to-fibonacci"]').click();

    cy.url().should('include', '/fibonacci');
  });

  it('Проверка, что при пустом инпуте кнопка будет заблокирована', () => {
    cy.get('[data-testid="input"]').invoke('prop', 'value').should('eq', '');

    cy.get('[data-testid="button"]').should('have.attr', 'disabled');
  });

  it('Проверка на коректность вычисления чисел Фибоначчи', () => {
    cy.get('[data-testid="input"]').type('8');

    cy.get('[data-testid="button"]').click();

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(0)
      .should('contain.text', '1')
      .find('[class*="circle_index__"]')
      .should('contain.text', '0');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(0)
      .should('contain.text', '1')
      .find('[class*="circle_index__"]')
      .should('contain.text', '0');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(1)
      .should('contain.text', '1')
      .find('[class*="circle_index__"]')
      .should('contain.text', '1');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(0)
      .should('contain.text', '1')
      .find('[class*="circle_index__"]')
      .should('contain.text', '0');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(1)
      .should('contain.text', '1')
      .find('[class*="circle_index__"]')
      .should('contain.text', '1');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(2)
      .should('contain.text', '2')
      .find('[class*="circle_index__"]')
      .should('contain.text', '2');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(0)
      .should('contain.text', '1')
      .find('[class*="circle_index__"]')
      .should('contain.text', '0');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(1)
      .should('contain.text', '1')
      .find('[class*="circle_index__"]')
      .should('contain.text', '1');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(2)
      .should('contain.text', '2')
      .find('[class*="circle_index__"]')
      .should('contain.text', '2');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(3)
      .should('contain.text', '3')
      .find('[class*="circle_index__"]')
      .should('contain.text', '3');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(0)
      .should('contain.text', '1')
      .find('[class*="circle_index__"]')
      .should('contain.text', '0');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(1)
      .should('contain.text', '1')
      .find('[class*="circle_index__"]')
      .should('contain.text', '1');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(2)
      .should('contain.text', '2')
      .find('[class*="circle_index__"]')
      .should('contain.text', '2');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(3)
      .should('contain.text', '3')
      .find('[class*="circle_index__"]')
      .should('contain.text', '3');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(4)
      .should('contain.text', '5')
      .find('[class*="circle_index__"]')
      .should('contain.text', '4');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(0)
      .should('contain.text', '1')
      .find('[class*="circle_index__"]')
      .should('contain.text', '0');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(1)
      .should('contain.text', '1')
      .find('[class*="circle_index__"]')
      .should('contain.text', '1');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(2)
      .should('contain.text', '2')
      .find('[class*="circle_index__"]')
      .should('contain.text', '2');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(3)
      .should('contain.text', '3')
      .find('[class*="circle_index__"]')
      .should('contain.text', '3');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(4)
      .should('contain.text', '5')
      .find('[class*="circle_index__"]')
      .should('contain.text', '4');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(5)
      .should('contain.text', '8')
      .find('[class*="circle_index__"]')
      .should('contain.text', '5');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(0)
      .should('contain.text', '1')
      .find('[class*="circle_index__"]')
      .should('contain.text', '0');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(1)
      .should('contain.text', '1')
      .find('[class*="circle_index__"]')
      .should('contain.text', '1');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(2)
      .should('contain.text', '2')
      .find('[class*="circle_index__"]')
      .should('contain.text', '2');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(3)
      .should('contain.text', '3')
      .find('[class*="circle_index__"]')
      .should('contain.text', '3');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(4)
      .should('contain.text', '5')
      .find('[class*="circle_index__"]')
      .should('contain.text', '4');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(5)
      .should('contain.text', '8')
      .find('[class*="circle_index__"]')
      .should('contain.text', '5');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(6)
      .should('contain.text', '13')
      .find('[class*="circle_index__"]')
      .should('contain.text', '6');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(0)
      .should('contain.text', '1')
      .find('[class*="circle_index__"]')
      .should('contain.text', '0');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(1)
      .should('contain.text', '1')
      .find('[class*="circle_index__"]')
      .should('contain.text', '1');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(2)
      .should('contain.text', '2')
      .find('[class*="circle_index__"]')
      .should('contain.text', '2');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(3)
      .should('contain.text', '3')
      .find('[class*="circle_index__"]')
      .should('contain.text', '3');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(4)
      .should('contain.text', '5')
      .find('[class*="circle_index__"]')
      .should('contain.text', '4');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(5)
      .should('contain.text', '8')
      .find('[class*="circle_index__"]')
      .should('contain.text', '5');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(6)
      .should('contain.text', '13')
      .find('[class*="circle_index__"]')
      .should('contain.text', '6');

    cy.get('[class^=fibonacci-page_circle__]')
      .eq(7)
      .should('contain.text', '21')
      .find('[class*="circle_index__"]')
      .should('contain.text', '7');
  });
});
