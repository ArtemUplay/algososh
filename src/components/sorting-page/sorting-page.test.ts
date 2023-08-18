import {
  bubbleSortingArr,
  choiceSortingArr,
} from '../../algorithms/algorithms';

describe('Тестирование алгоритмов сортировки выбором и пузырьком', () => {
  test('Корректно сортирует пустой массив (сортировка выбором)', () => {
    const unsortedArray: number[] = [];
    const sortedArr: number[] = choiceSortingArr(unsortedArray);

    expect(sortedArr).toEqual([]);
  });

  test('Корректно сортирует пустой массив (сортировка пузырьком)', () => {
    const unsortedArray: number[] = [];
    const sortedArr: number[] = choiceSortingArr(unsortedArray);

    expect(sortedArr).toEqual([]);
  });

  test('Корректно сортирует массив из одного элемента (сортировка выбором)', () => {
    const unsortedArray: number[] = [1];
    const sortedArr: number[] = choiceSortingArr(unsortedArray);

    expect(sortedArr).toEqual([1]);
  });

  test('Корректно сортирует массив из одного элемента (сортировка пузырьком)', () => {
    const unsortedArray: number[] = [1];
    const sortedArr: number[] = choiceSortingArr(unsortedArray);

    expect(sortedArr).toEqual([1]);
  });

  test('Корректно сортирует массив из нескольких элементов (сортировка выбором)', () => {
    const unsortedArray: number[] = [5, 2, 9, 7, 1, 8, 3, 6, 10, 4];
    const sortedArr: number[] = choiceSortingArr(unsortedArray);

    expect(sortedArr).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  test('Корректно сортирует массив из нескольких элементов (сортировка пузырьком)', () => {
    const unsortedArray: number[] = [5, 2, 9, 7, 1, 8, 3, 6, 10, 4];
    const sortedArr: number[] = bubbleSortingArr(unsortedArray);

    expect(sortedArr).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
