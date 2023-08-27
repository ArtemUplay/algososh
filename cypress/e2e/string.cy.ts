/// <reference types="cypress" />

describe('Проверка компонента string', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="link-to-string"]').click();

    cy.url().should('include', '/recursion');
  });

  it('Проверка, что при пустом инпуте кнопка будет заблокирована', () => {
    cy.get('[data-testid="input"]').invoke('prop', 'value').should('eq', '');

    cy.get('[data-testid="button"]').should('have.attr', 'disabled');
  });

  it('Проверка на корректность разворачивания строки', () => {
    cy.get('[data-testid="input"]').type('hello');

    cy.get('[data-testid="button"]').click();

    cy.get('[class^=circle_content__]').should('have.length', 5);

    cy.get('[class^=circle_content__]')
      .eq(0)
      .should('contain.text', 'h')
      .find('[class^=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.get('[class^=circle_content__]')
      .eq(1)
      .should('contain.text', 'e')
      .find('[class^=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.get('[class^=circle_content__]')
      .eq(2)
      .should('contain.text', 'l')
      .find('[class^=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.get('[class^=circle_content__]')
      .eq(3)
      .should('contain.text', 'l')
      .find('[class^=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.get('[class^=circle_content__]')
      .eq(4)
      .should('contain.text', 'o')
      .find('[class^=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(0, 50, 255)');

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get('[class^=circle_content__]')
      .eq(0)
      .should('contain.text', 'o')
      .find('[class^=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(127, 224, 81)');

    cy.get('[class^=circle_content__]')
      .eq(1)
      .should('contain.text', 'e')
      .find('[class^=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    cy.get('[class^=circle_content__]')
      .eq(2)
      .should('contain.text', 'l')
      .find('[class^=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.get('[class^=circle_content__]')
      .eq(3)
      .should('contain.text', 'l')
      .find('[class^=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    cy.get('[class^=circle_content__]')
      .eq(4)
      .should('contain.text', 'h')
      .find('[class^=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(127, 224, 81)');

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get('[class^=circle_content__]')
      .eq(0)
      .should('contain.text', 'o')
      .find('[class^=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(127, 224, 81)');

    cy.get('[class^=circle_content__]')
      .eq(1)
      .should('contain.text', 'l')
      .find('[class^=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(127, 224, 81)');

    cy.get('[class^=circle_content__]')
      .eq(2)
      .should('contain.text', 'l')
      .find('[class^=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    cy.get('[class^=circle_content__]')
      .eq(3)
      .should('contain.text', 'e')
      .find('[class^=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(127, 224, 81)');

    cy.get('[class^=circle_content__]')
      .eq(4)
      .should('contain.text', 'h')
      .find('[class^=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(127, 224, 81)');

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get('[class^=circle_content__]')
      .eq(0)
      .should('contain.text', 'o')
      .find('[class^=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(127, 224, 81)');

    cy.get('[class^=circle_content__]')
      .eq(1)
      .should('contain.text', 'l')
      .find('[class^=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(127, 224, 81)');

    cy.get('[class^=circle_content__]')
      .eq(2)
      .should('contain.text', 'l')
      .find('[class^=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(127, 224, 81)');

    cy.get('[class^=circle_content__]')
      .eq(3)
      .should('contain.text', 'e')
      .find('[class^=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(127, 224, 81)');

    cy.get('[class^=circle_content__]')
      .eq(4)
      .should('contain.text', 'h')
      .find('[class^=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(127, 224, 81)');
  });
});
