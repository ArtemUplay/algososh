import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('Тестирование компонента Circle', () => {
  test('Circle правильно рендерится без буквы', () => {
    const tree = renderer.create(<Circle letter='' />);
    expect(tree).toMatchSnapshot();
  });

  test('Circle правильно рендерится с буквами', () => {
    const tree = renderer.create(<Circle letter='test' />);
    expect(tree).toMatchSnapshot();
  });

  test('Circle правильно рендерится с текстом в head', () => {
    const tree = renderer.create(<Circle head='test' />);
    expect(tree).toMatchSnapshot();
  });

  test('Circle правильно рендерится с React-элементов в head', () => {
    const tree = renderer.create(<Circle head={<Circle letter='test' />} />);
    expect(tree).toMatchSnapshot();
  });

  test('Circle правильно рендерится с tail', () => {
    const tree = renderer.create(<Circle tail='test' />);
    expect(tree).toMatchSnapshot();
  });

  test('Circle правильно рендерится с React-элементов в tail', () => {
    const tree = renderer.create(<Circle tail={<Circle letter='test' />} />);
    expect(tree).toMatchSnapshot();
  });

  test('Circle правильно рендерится с index', () => {
    const tree = renderer.create(<Circle index={1} />);
    expect(tree).toMatchSnapshot();
  });

  test('Circle правильно рендерится с пропсом isSmall', () => {
    const tree = renderer.create(<Circle isSmall={true} />);
    expect(tree).toMatchSnapshot();
  });

  test('Circle правильно рендерится в состоянии default', () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />);
    expect(tree).toMatchSnapshot();
  });

  test('Circle правильно рендерится в состоянии changing', () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />);
    expect(tree).toMatchSnapshot();
  });

  test('Circle правильно рендерится в состоянии modified', () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />);
    expect(tree).toMatchSnapshot();
  });
});
