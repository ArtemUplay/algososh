/// <reference types="cypress" />

describe('Проверка компонента Queue', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="link-to-queue"]').click();

    cy.url().should('include', '/queue');
  });

  it('Проверка, что при пустом инпуте кнопка добавления заблокирована', () => {
    cy.get('[data-testid="input"]').invoke('prop', 'value').should('eq', '');

    cy.get('[data-testid="addButton"]').should('have.attr', 'disabled');
  });

  it('Проверка правильности добавления элемента в очередь', () => {
    // Добавляем первый элемент
    cy.get('[data-testid="input"]').type('55');

    cy.get('[data-testid="addButton"]').click();

    cy.get('[class*=circle_content__]')
      .find('[class*=circle_circle__]')
      .eq(0)
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[class*=circle_content__]')
      .eq(0)
      .find('[class*=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.get('[class*=circle_content__]')
      .eq(0)
      .should('contain.text', '55')
      .find('[class*=circle_index__]')
      .contains(0);

    cy.get('[class*=circle_content__]')
      .eq(0)
      .find('[class*=circle_head__]')
      .should('contain.text', 'head');

    cy.get('[class*=circle_content__]')
      .eq(0)
      .find('[class*=circle_tail]')
      .should('contain.text', 'tail');

    // Добавляем второй элемент
    cy.get('[data-testid="input"]').type('2');

    cy.get('[data-testid="addButton"]').click();

    cy.get('[class*=circle_content__]')
      .find('[class*=circle_circle__]')
      .eq(1)
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[class*=circle_content__]')
      .find('[class*=circle_circle__]')
      .eq(1)
      .should('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.get('[class*=circle_content__]')
      .eq(1)
      .should('contain.text', '2')
      .find('[class*=circle_index__]')
      .contains(1);

    cy.get('[class*=circle_content__]')
      .eq(1)
      .find('[class*=circle_tail]')
      .should('contain.text', 'tail');

    // Проверяем, что у второго элемента нет указателя head
    cy.get('[class*=circle_content__]')
      .eq(1)
      .find('[class*=circle_head__]')
      .should('not.contain.text', 'head');

    // Проверяем, что у первого элемента нет указателя tail
    cy.get('[class*=circle_content__]')
      .eq(0)
      .find('[class*=circle_tail]')
      .should('not.contain.text', 'tail');

    // Добавляем третий элемент
    cy.get('[data-testid="input"]').type('1');

    cy.get('[data-testid="addButton"]').click();

    cy.get('[class*=circle_content__]')
      .find('[class*=circle_circle__]')
      .eq(2)
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[class*=circle_content__]')
      .find('[class*=circle_circle__]')
      .eq(2)
      .should('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.get('[class*=circle_content__]')
      .eq(2)
      .should('contain.text', '1')
      .find('[class*=circle_index__]')
      .contains(2);

    cy.get('[class*=circle_content__]')
      .eq(2)
      .find('[class*=circle_tail]')
      .should('contain.text', 'tail');

    // Проверяем, что у третьего элемента нет указателя head
    cy.get('[class*=circle_content__]')
      .eq(2)
      .find('[class*=circle_head__]')
      .should('not.contain.text', 'head');

    // Проверяем, что у второго элемента нет указателя tail
    cy.get('[class*=circle_content__]')
      .eq(1)
      .find('[class*=circle_tail]')
      .should('not.contain.text', 'tail');
  });

  it('Проверяем правильность удаления элементов из очереди', () => {
    // Добавим три элемента элемента в очередь
    cy.get('[data-testid="input"]').type('2');

    cy.get('[data-testid="addButton"]').click();

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[data-testid="input"]').type('5');

    cy.get('[data-testid="addButton"]').click();

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[data-testid="input"]').type('7');

    cy.get('[data-testid="addButton"]').click();

    // Удаляем элемент
    cy.get('[data-testid="removeButton"]').click();

    cy.get('[class*=circle_content__]')
      .find('[class*=circle_circle__]')
      .eq(0)
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[class*=circle_content__]')
      .find('[class*=circle_circle__]')
      .eq(0)
      .should('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.get('[class*=circle_content__]').eq(0).should('contain.text', '');

    // Проверяем, что у первого элемента больше нет указателя head
    cy.get('[class*=circle_content__]')
      .eq(0)
      .find('[class*=circle_head__]')
      .should('not.contain.text', 'head');

    // Проверяем, что указатель head появляется у второго элемента
    cy.get('[class*=circle_content__]')
      .eq(1)
      .find('[class*=circle_head__]')
      .should('contain.text', 'head');

    // Удаляем ещё один элемент
    cy.get('[data-testid="removeButton"]').click();

    cy.get('[class*=circle_content__]')
      .find('[class*=circle_circle__]')
      .eq(1)
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[class*=circle_content__]')
      .find('[class*=circle_circle__]')
      .eq(1)
      .should('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.get('[class*=circle_content__]').eq(1).should('contain.text', '');

    // Проверяем, что у второго элемента больше нет указателя head
    cy.get('[class*=circle_content__]')
      .eq(1)
      .find('[class*=circle_head__]')
      .should('not.contain.text', 'head');

    // Проверяем, что указатель head появляется у третьего элемента
    cy.get('[class*=circle_content__]')
      .eq(2)
      .find('[class*=circle_head__]')
      .should('contain.text', 'head');
  });

  it('Проверяем поведение кнопки "Очистить"', () => {
    // Добавим три элемента в очередь
    cy.get('[data-testid="input"]').type('2');

    cy.get('[data-testid="addButton"]').click();

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[data-testid="input"]').type('5');

    cy.get('[data-testid="addButton"]').click();

    // eslint-disable-next-line
    cy.wait(500);

    cy.get('[data-testid="input"]').type('7');

    cy.get('[data-testid="addButton"]').click();

    cy.get('[data-testid="clearButton"]').click();

    cy.get('[class*=circle_content__]').each(($el) => {
      cy.wrap($el).should('contain.text', '');
    });

    cy.get('[class*=circle_content__]')
      .find('[class*=circle_head__]')
      .each(($el) => {
        cy.wrap($el).should('contain.text', '');
      });

    cy.get('[class*=circle_content__]')
      .find('[class*=circle_tail]')
      .each(($el) => {
        cy.wrap($el).should('contain.text', '');
      });
  });
});
