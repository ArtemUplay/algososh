/// <reference types="cypress" />

describe('Проверка компонента Stack', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="link-to-stack"]').click();

    cy.url().should('include', '/stack');
  });

  it('Проверка, что при пустом инпуте кнопки будут заблокированы', () => {
    cy.get('[data-testid="input"]').invoke('prop', 'value').should('eq', '');

    cy.get('[data-testid="addButton"]').should('have.attr', 'disabled');
    cy.get('[data-testid="removeButton"]').should('have.attr', 'disabled');
    cy.get('[data-testid="clearButton"]').should('have.attr', 'disabled');
  });

  it('Проверка добавления элемента', () => {
    // Добавляем первый элемент
    cy.get('[data-testid="input"]').type('5');

    cy.get('[data-testid="addButton"]').click();

    cy.get('[class*=circle_content__]')
      .should('contain.text', '5')
      .find('[class*=circle_index__]')
      .contains(0);

    cy.get('[class*=circle_content__]')
      .find('[class*=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    cy.get('[class*=circle_content__]')
      .find('[class*=circle_head__]')
      .should('contain.text', 'top');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[class*=circle_content__]')
      .find('[class*=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(0, 50, 255)');

    // Добавляем второй элемент
    cy.get('[data-testid="input"]').type('7');

    cy.get('[data-testid="addButton"]').click();

    cy.get('[class*=circle_content__]')
      .eq(1)
      .should('contain.text', '7')
      .find('[class*=circle_index__]')
      .contains(1);

    cy.get('[class*=circle_content__]')
      .eq(1)
      .find('[class*=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    cy.get('[class*=circle_content__]')
      .eq(1)
      .find('[class*=circle_head__]')
      .should('contain.text', 'top');

    // Проверяем, что у первого элемента больше нет указателя top
    cy.get('[class*=circle_content__]')
      .eq(0)
      .find('[class*=circle_head__]')
      .should('contain.text', '');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[class*=circle_content__]')
      .eq(1)
      .find('[class*=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  });

  it('Проверка удаления элемента', () => {
    cy.get('[data-testid="input"]').type('5');

    cy.get('[data-testid="addButton"]').click();

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[data-testid="input"]').type('7');

    cy.get('[data-testid="addButton"]').click();

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[data-testid="removeButton"]').click();

    cy.get('[class*=circle_content__]')
      .eq(1)
      .find('[class*=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    cy.get('[class*=circle_content__]').should('have.length', '1');

    cy.get('[class*=circle_content__]')
      .find('[class*=circle_head__]')
      .should('contain.text', 'top');
  });

  it('Проверка очистки всех элементов', () => {
    cy.get('[data-testid="input"]').type('5');

    cy.get('[data-testid="addButton"]').click();

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[data-testid="input"]').type('7');

    cy.get('[data-testid="addButton"]').click();

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[data-testid="clearButton"]').click();

    cy.get('[class*=circle_content__]').should('have.length', '0');
  });
});
