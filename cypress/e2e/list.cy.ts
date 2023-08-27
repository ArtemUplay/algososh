describe('Проверка компонента List', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="link-to-list"]').click();

    cy.url().should('include', '/list');
  });

  it('Проверка, что при пустых инпутах кнопки добавления и кнопка удаления по индексу заблокированы', () => {
    cy.get('[data-testid="valueInput"]')
      .invoke('prop', 'value')
      .should('eq', '');

    cy.get('[data-testid="addHeadButton"]').should('have.attr', 'disabled');
    cy.get('[data-testid="addTailButton"]').should('have.attr', 'disabled');

    cy.get('[data-testid="indexInput"]')
      .invoke('prop', 'value')
      .should('eq', '');

    cy.get('[data-testid="addByIndexButton"]').should('have.attr', 'disabled');
    cy.get('[data-testid="removeByIndexButton"]').should(
      'have.attr',
      'disabled'
    );
  });

  it('Проверка отрисовки дефолтного списка', () => {
    cy.get('[class*=circle_content__]').should('have.length', '4');

    // Проверим, что у первого элемента есть указатель head
    cy.get('[class*=circle_content__]')
      .eq(0)
      .find('[class*=circle_head__]')
      .should('contain.text', 'head');

    // Проверим, что у последнего элемента есть указатель tail
    cy.get('[class*=circle_content__]')
      .eq(3)
      .find('[class*=circle_tail]')
      .should('contain.text', 'tail');

    // Проверим, что в каждом элементе находится правильное число
    cy.get('[class*=circle_content__]').eq(0).should('contain.text', '0');
    cy.get('[class*=circle_content__]').eq(1).should('contain.text', '34');
    cy.get('[class*=circle_content__]').eq(2).should('contain.text', '8');
    cy.get('[class*=circle_content__]').eq(3).should('contain.text', '1');
  });

  it('Проверка добавления элемента в head', () => {
    cy.get('[data-testid="valueInput"]').type('55');

    cy.get('[data-testid="addHeadButton"]').click();

    cy.get('[class*=circle_content__]')
      .eq(0)
      .find('[class*=circle_head__]')
      .find('[class*=circle_small__]')
      .should('contain.text', '55')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get('[class*=circle_content__]')
      .eq(0)
      .find('[class*=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(127, 224, 81)');

    cy.get('[class*=circle_content__]')
      .eq(0)
      .find('[class*=circle_head__]')
      .should('contain.text', 'head');

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get('[class*=circle_content__]').should('have.length', '5');

    cy.get('[class*=circle_content__]')
      .eq(0)
      .find('[class*=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  });

  it('Проверка добавления элемента в tail', () => {
    cy.get('[data-testid="valueInput"]').type('2');

    cy.get('[data-testid="addTailButton"]').click();

    cy.get('[class*=circle_content__]')
      .eq(3)
      .find('[class*=circle_head__]')
      .find('[class*=circle_small__]')
      .should('contain.text', '2')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get('[class*=circle_content__]')
      .eq(4)
      .find('[class*=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(127, 224, 81)');

    cy.get('[class*=circle_content__]')
      .eq(4)
      .find('[class*=circle_tail]')
      .should('contain.text', 'tail');

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get('[class*=circle_content__]').should('have.length', '5');

    cy.get('[class*=circle_content__]')
      .eq(4)
      .find('[class*=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  });

  it('Проверка добавления элемента по индексу', () => {
    cy.get('[data-testid="valueInput"]').type('10');
    cy.get('[data-testid="indexInput"]').type('2');

    cy.get('[data-testid="addByIndexButton"]').click();

    cy.get('[class*=circle_content__]')
      .eq(0)
      .find('[class*=circle_head__]')
      .find('[class*=circle_small__]')
      .should('contain.text', '10')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get('[class*=circle_content__]')
      .eq(0)
      .find('[class*=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    cy.get('[class*=circle_content__]')
      .eq(1)
      .find('[class*=circle_head__]')
      .find('[class*=circle_small__]')
      .should('contain.text', '10')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get('[class*=circle_content__]')
      .eq(0)
      .find('[class*=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    cy.get('[class*=circle_content__]')
      .eq(1)
      .find('[class*=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    cy.get('[class*=circle_content__]')
      .eq(2)
      .find('[class*=circle_head__]')
      .find('[class*=circle_small__]')
      .should('contain.text', '10')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get('[class*=circle_content__]').should('have.length', '5');

    cy.get('[class*=circle_content__]').eq(2).should('contain.text', '10');

    cy.get('[class*=circle_content__]')
      .eq(2)
      .find('[class*=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(127, 224, 81)');

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get('[class*=circle_content__]')
      .eq(2)
      .find('[class*=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  });

  it('Проверка удаления из head', () => {
    cy.get('[data-testid="removeHeadButton"]').click();

    cy.get('[class*=circle_content__]').eq(0).should('contain.text', '');

    cy.get('[class*=circle_content__]')
      .eq(0)
      .find('[class*=circle_tail]')
      .find('[class*=circle_small__]')
      .should('contain.text', '0')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get('[class*=circle_content__]').should('have.length', 3);

    cy.get('[class*=circle_content__]')
      .eq(0)
      .find('[class*=circle_head__]')
      .should('contain.text', 'head');

    cy.get('[class*=circle_content__]').eq(0).should('contain.text', '34');
  });

  it('Проверка удаления из tail', () => {
    cy.get('[data-testid="removeTailButton"]').click();

    cy.get('[class*=circle_content__]').eq(3).should('contain.text', '');

    cy.get('[class*=circle_content__]')
      .eq(3)
      .find('[class*=circle_tail]')
      .find('[class*=circle_small__]')
      .should('contain.text', '1')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get('[class*=circle_content__]').should('have.length', 3);

    cy.get('[class*=circle_content__]')
      .eq(2)
      .find('[class*=circle_tail]')
      .should('contain.text', 'tail');

    cy.get('[class*=circle_content__]').eq(2).should('contain.text', '8');
  });

  it('Проверка удаления элемента по индексу', () => {
    cy.get('[data-testid="indexInput"]').type('2');
    cy.get('[data-testid="removeByIndexButton"]').click();

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get('[class*=circle_content__]')
      .eq(0)
      .find('[class*=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get('[class*=circle_content__]')
      .eq(0)
      .find('[class*=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    cy.get('[class*=circle_content__]')
      .eq(1)
      .find('[class*=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get('[class*=circle_content__]')
      .eq(0)
      .find('[class*=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    cy.get('[class*=circle_content__]')
      .eq(1)
      .find('[class*=circle_circle__]')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    cy.get('[class*=circle_content__]')
      .eq(2)
      .find('[class*=circle_tail]')
      .find('[class*=circle_small__]')
      .should('contain.text', '8')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get('[class*=circle_content__]').should('have.length', 3);
  });
});
