import { reverseByTwoPointers } from '../../algorithms/algorithms';

describe('Тестирование алгоритма разворота строки', () => {
  test('Корректно разворачивает строку с чётным количеством символов.', () => {
    const arr = ['t', 'e', 's', 't'];
    const reversedString = reverseByTwoPointers(arr);

    expect(reversedString).toEqual(['t', 's', 'e', 't']);
  });

  test('Корректно разворачивает строку с нечётным количеством символов.', () => {
    const arr = ['h', 'e', 'l', 'l', 'o'];
    const reversedString = reverseByTwoPointers(arr);

    expect(reversedString).toEqual(['o', 'l', 'l', 'e', 'h']);
  });

  test('Корректно разворачивает строку с одним символом.', () => {
    const arr = ['h'];
    const reversedString = reverseByTwoPointers(arr);

    expect(reversedString).toEqual(['h']);
  });

  test('Корректно разворачивает пустую строку.', () => {
    const arr = [''];
    const reversedString = reverseByTwoPointers(arr);

    expect(reversedString).toEqual(['']);
  });
});
