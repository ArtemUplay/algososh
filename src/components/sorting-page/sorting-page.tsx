import React, { ChangeEvent, useState, MouseEvent, useEffect } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import styles from './sorting-page.module.css';
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';
import { Column } from '../ui/column/column';

export const SortingPage: React.FC = () => {
  const [items, setItems] = useState<number[]>([]);
  const [sortingMethod, setSortingMethod] = useState<string>('Выбор');
  const [sortingDirection, setSortingDirection] = useState<Direction>(
    Direction.Ascending
  );

  const handleSortingMethodChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSortingMethod(evt.target.value);
  };

  const handleSortingDirectionChange = (evt: MouseEvent<HTMLButtonElement>) => {
    setSortingDirection(evt.currentTarget.value as Direction);

    if (sortingMethod === 'Выбор' && items.length > 0) {
      setItems(choiceSortingArr([...items]));
    } else if (sortingMethod === 'Пузырёк' && items.length > 0) {
      setItems(bubbleSortingArr([...items]));
    }
  };

  const handleRandomArrayButtonClick = () => {
    if (items.length > 0) {
      setItems([]);
    }
    setItems(randomArr());
  };

  useEffect(() => {
    setItems(randomArr());
  }, []);

  const randomArr = (): number[] => {
    const arr: number[] = [];

    const numberArrayItems = Math.floor(Math.random() * (17 - 3) + 3);

    for (let i = 0; i < numberArrayItems; i++) {
      const currArrItemValue = Math.round(Math.random() * 100);

      arr.push(currArrItemValue);
    }

    return arr;
  };

  const choiceSortingArr = (arr: number[]): number[] => {
    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;

      for (let j = i + 1; j < arr.length; j++) {
        if (sortingDirection === Direction.Ascending) {
          if (arr[j] < arr[minIndex]) {
            minIndex = j;
          }
        } else if (sortingDirection === Direction.Descending) {
          console.log(sortingDirection);
          if (arr[j] > arr[minIndex]) {
            minIndex = j;
          }
        }
      }

      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
  };

  const bubbleSortingArr = (arr: number[]): number[] => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (sortingDirection === Direction.Ascending) {
          if (arr[j + 1] < arr[j]) {
            [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
          }
        } else if (sortingDirection === Direction.Descending) {
          if (arr[j + 1] > arr[j]) {
            [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
          }
        }
      }
    }

    return arr;
  };

  return (
    <SolutionLayout title='Сортировка массива'>
      <div className={styles.menu}>
        <div style={{ display: 'flex', gap: '40px' }}>
          <RadioInput
            label='Выбор'
            checked={sortingMethod === 'Выбор'}
            name='Метод сортировки'
            value='Выбор'
            onChange={handleSortingMethodChange}
          />
          <RadioInput
            label='Пузырёк'
            name='Метод сортировки'
            value='Пузырёк'
            checked={sortingMethod === 'Пузырёк'}
            onChange={handleSortingMethodChange}
          />
        </div>
        <div style={{ display: 'flex', gap: '12px', marginLeft: '52px' }}>
          <Button
            text='По возрастанию'
            sorting={Direction.Ascending}
            value={Direction.Ascending}
            onClick={handleSortingDirectionChange}
          />
          <Button
            text='По убыванию'
            sorting={Direction.Descending}
            value={Direction.Descending}
            onClick={handleSortingDirectionChange}
          />
        </div>
        <div style={{ marginLeft: '80px' }}>
          <Button text='Новый массив' onClick={handleRandomArrayButtonClick} />
        </div>
      </div>
      <div className={styles.columns}>
        {items.length > 0
          ? items.map((item, index) => {
              return <Column key={index} index={item} />;
            })
          : null}
      </div>
    </SolutionLayout>
  );
};
