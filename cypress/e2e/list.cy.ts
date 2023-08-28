import {
  valueInputSelector,
  indexInputSelector,
  addHeadButton,
  addTailButton,
  addByIndexButton,
  removeByIndexButton,
  smallCircleSelector,
  circleSelector,
  circleBorderSelector,
  circleHeadSelector,
  circleTailSelector,
  removeHeadButton,
  removeTailButton,
  defaultBorderColor,
  changingBorderColor,
  modifiedBorderColor,
} from '../../src/constants/selectors';

describe('Проверка компонента List', () => {
  beforeEach(() => {
    cy.visit('/list');

    cy.url().should('include', '/list');
  });

  it('Проверка, что при пустых инпутах кнопки добавления и кнопка удаления по индексу заблокированы', () => {
    cy.get(valueInputSelector).invoke('prop', 'value').should('eq', '');

    cy.get(addHeadButton).should('have.attr', 'disabled');
    cy.get(addTailButton).should('have.attr', 'disabled');

    cy.get(indexInputSelector).invoke('prop', 'value').should('eq', '');

    cy.get(addByIndexButton).should('have.attr', 'disabled');
    cy.get(removeByIndexButton).should('have.attr', 'disabled');
  });

  it('Проверка отрисовки дефолтного списка', () => {
    cy.get(circleSelector).should('have.length', '4');

    // Проверим, что у первого элемента есть указатель head
    cy.get(circleSelector)
      .eq(0)
      .find(circleHeadSelector)
      .should('contain.text', 'head');

    // Проверим, что у последнего элемента есть указатель tail
    cy.get(circleSelector)
      .eq(3)
      .find(circleTailSelector)
      .should('contain.text', 'tail');

    // Проверим, что в каждом элементе находится правильное число
    cy.get(circleSelector).eq(0).should('contain.text', '0');
    cy.get(circleSelector).eq(1).should('contain.text', '34');
    cy.get(circleSelector).eq(2).should('contain.text', '8');
    cy.get(circleSelector).eq(3).should('contain.text', '1');
  });

  it('Проверка добавления элемента в head', () => {
    cy.get(valueInputSelector).type('55');

    cy.get(addHeadButton).click();

    cy.get(circleSelector)
      .eq(0)
      .find(circleHeadSelector)
      .find(smallCircleSelector)
      .should('contain.text', '55')
      .should('have.css', 'border', changingBorderColor);

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get(circleSelector)
      .eq(0)
      .find(circleBorderSelector)
      .should('have.css', 'border', modifiedBorderColor);

    cy.get(circleSelector)
      .eq(0)
      .find(circleHeadSelector)
      .should('contain.text', 'head');

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get(circleSelector).should('have.length', '5');

    cy.get(circleSelector)
      .eq(0)
      .find(circleBorderSelector)
      .should('have.css', 'border', defaultBorderColor);
  });

  it('Проверка добавления элемента в tail', () => {
    cy.get(valueInputSelector).type('2');

    cy.get(addTailButton).click();

    cy.get(circleSelector)
      .eq(3)
      .find(circleHeadSelector)
      .find(smallCircleSelector)
      .should('contain.text', '2')
      .should('have.css', 'border', changingBorderColor);

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get(circleSelector)
      .eq(4)
      .find(circleBorderSelector)
      .should('have.css', 'border', modifiedBorderColor);

    cy.get(circleSelector)
      .eq(4)
      .find(circleTailSelector)
      .should('contain.text', 'tail');

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get(circleSelector).should('have.length', '5');

    cy.get(circleSelector)
      .eq(4)
      .find(circleBorderSelector)
      .should('have.css', 'border', defaultBorderColor);
  });

  it('Проверка добавления элемента по индексу', () => {
    cy.get(valueInputSelector).type('10');
    cy.get(indexInputSelector).type('2');

    cy.get(addByIndexButton).click();

    cy.get(circleSelector)
      .eq(0)
      .find(circleHeadSelector)
      .find(smallCircleSelector)
      .should('contain.text', '10')
      .should('have.css', 'border', changingBorderColor);

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get(circleSelector)
      .eq(0)
      .find(circleBorderSelector)
      .should('have.css', 'border', changingBorderColor);

    cy.get(circleSelector)
      .eq(1)
      .find(circleHeadSelector)
      .find(smallCircleSelector)
      .should('contain.text', '10')
      .should('have.css', 'border', changingBorderColor);

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get(circleSelector)
      .eq(0)
      .find(circleBorderSelector)
      .should('have.css', 'border', changingBorderColor);

    cy.get(circleSelector)
      .eq(1)
      .find(circleBorderSelector)
      .should('have.css', 'border', changingBorderColor);

    cy.get(circleSelector)
      .eq(2)
      .find(circleHeadSelector)
      .find(smallCircleSelector)
      .should('contain.text', '10')
      .should('have.css', 'border', changingBorderColor);

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get(circleSelector).should('have.length', '5');

    cy.get(circleSelector).eq(2).should('contain.text', '10');

    cy.get(circleSelector)
      .eq(2)
      .find(circleBorderSelector)
      .should('have.css', 'border', modifiedBorderColor);

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get(circleSelector)
      .eq(2)
      .find(circleBorderSelector)
      .should('have.css', 'border', defaultBorderColor);
  });

  it('Проверка удаления из head', () => {
    cy.get(removeHeadButton).click();

    cy.get(circleSelector).eq(0).should('contain.text', '');

    cy.get(circleSelector)
      .eq(0)
      .find(circleTailSelector)
      .find(smallCircleSelector)
      .should('contain.text', '0')
      .should('have.css', 'border', changingBorderColor);

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get(circleSelector).should('have.length', 3);

    cy.get(circleSelector)
      .eq(0)
      .find(circleHeadSelector)
      .should('contain.text', 'head');

    cy.get(circleSelector).eq(0).should('contain.text', '34');
  });

  it('Проверка удаления из tail', () => {
    cy.get(removeTailButton).click();

    cy.get(circleSelector).eq(3).should('contain.text', '');

    cy.get(circleSelector)
      .eq(3)
      .find(circleTailSelector)
      .find(smallCircleSelector)
      .should('contain.text', '1')
      .should('have.css', 'border', changingBorderColor);

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get(circleSelector).should('have.length', 3);

    cy.get(circleSelector)
      .eq(2)
      .find(circleTailSelector)
      .should('contain.text', 'tail');

    cy.get(circleSelector).eq(2).should('contain.text', '8');
  });

  it('Проверка удаления элемента по индексу', () => {
    cy.get(indexInputSelector).type('2');
    cy.get(removeByIndexButton).click();

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get(circleSelector)
      .eq(0)
      .find(circleBorderSelector)
      .should('have.css', 'border', changingBorderColor);

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get(circleSelector)
      .eq(0)
      .find(circleBorderSelector)
      .should('have.css', 'border', changingBorderColor);

    cy.get(circleSelector)
      .eq(1)
      .find(circleBorderSelector)
      .should('have.css', 'border', changingBorderColor);

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get(circleSelector)
      .eq(0)
      .find(circleBorderSelector)
      .should('have.css', 'border', changingBorderColor);

    cy.get(circleSelector)
      .eq(1)
      .find(circleBorderSelector)
      .should('have.css', 'border', changingBorderColor);

    cy.get(circleSelector)
      .eq(2)
      .find(circleTailSelector)
      .find(smallCircleSelector)
      .should('contain.text', '8')
      .should('have.css', 'border', changingBorderColor);

    // eslint-disable-next-line
    cy.wait(1000);

    cy.get(circleSelector).should('have.length', 3);
  });
});
