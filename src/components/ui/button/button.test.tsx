import renderer from 'react-test-renderer'; // Импортируем библиотеку react-test-renderer
import { Button } from './button';
import { render, fireEvent, screen } from '@testing-library/react';

describe('Тестирование компонента Button', () => {
  test('Button правильно рендерится с текстом', () => {
    const buttonText = 'Нажми меня'; // Текст для кнопки

    // Создание виртуального представления компонента Button для создания снэпшота
    const tree = renderer.create(<Button text={buttonText} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Button правильно рендерится без текста', () => {
    const tree = renderer.create(<Button text='' />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Button правильно рендерится в состоянии disabled', () => {
    const tree = renderer.create(<Button disabled />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Button правильно рендерится с индикатором загрузки', () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Проверка вызова колбека по клику на кнопку', () => {
    const onButtonClick = jest.fn();

    render(<Button text='Нажми меня' onClick={onButtonClick} />);

    const buttonElement = screen.getByText('Нажми меня');

    fireEvent.click(buttonElement);

    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });
});
