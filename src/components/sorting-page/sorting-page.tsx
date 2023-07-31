import React, { ChangeEvent, useState, MouseEvent, useEffect } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import styles from './sorting-page.module.css';
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';
import { Column } from '../ui/column/column';
import { ElementStates } from '../../types/element-states';

type TCurrentButtonValue =
  | Direction.Ascending
  | Direction.Descending
  | 'Новый массив'
  | null;

export const SortingPage: React.FC = () => {
  const [items, setItems] = useState<number[]>([]);
  const [sortingMethod, setSortingMethod] = useState<string>('Выбор');
  const [changingIndexes, setChangingIndexes] = useState<number[]>([]);
  const [modifiedIndexes, setModifiedIndexes] = useState<number[]>([]);
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [currentButtonValue, setCurrentButtonValue] =
    useState<TCurrentButtonValue>(null);

  const handleSortingMethodChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSortingMethod(evt.target.value);
  };

  const handleSortingDirectionChange = async (
    evt: MouseEvent<HTMLButtonElement>
  ) => {
    if (sortingMethod === 'Выбор') {
      await choiceSortingArr([...items], evt.currentTarget.value as Direction);
    } else if (sortingMethod === 'Пузырёк') {
      await bubbleSortingArr([...items], evt.currentTarget.value as Direction);
    }
  };

  const handleRandomArrayButtonClick = () => {
    if (items.length > 0) {
      setItems([]);
    }

    setItems(randomArr());
  };

  useEffect(() => {
    setIsChanging(true);

    setItems(randomArr());

    setIsChanging(false);
  }, []);

  const handleButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    setCurrentButtonValue(evt.currentTarget.value as TCurrentButtonValue);
  };

  useEffect(() => {
    if (!isChanging) {
      setCurrentButtonValue(null);
    }
  }, [isChanging]);

  const randomArr = (): number[] => {
    const arr: number[] = [];
    setModifiedIndexes([]);

    const numberArrayItems = Math.floor(Math.random() * (17 - 3) + 3);

    for (let i = 0; i < numberArrayItems; i++) {
      const currArrItemValue = Math.round(Math.random() * 100);

      arr.push(currArrItemValue);
    }

    return arr;
  };

  const choiceSortingArr = async (
    arr: number[],
    sortingDirection: Direction
  ) => {
    setIsChanging(true);
    setModifiedIndexes([]);

    let changingIndexes: number[] = [];
    let modifiedIndexes: number[] = [];

    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;

      for (let j = i + 1; j < arr.length; j++) {
        changingIndexes = [];
        changingIndexes.push(i);
        changingIndexes.push(j);

        setChangingIndexes([...changingIndexes]);
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (sortingDirection === Direction.Ascending) {
          if (arr[j] < arr[minIndex]) {
            minIndex = j;
          }
        } else if (sortingDirection === Direction.Descending) {
          if (arr[j] > arr[minIndex]) {
            minIndex = j;
          }
        }
      }

      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

      modifiedIndexes.push(i);

      setModifiedIndexes([...modifiedIndexes]);
      setItems(arr);
    }

    setChangingIndexes([]);
    setIsChanging(false);
  };

  const bubbleSortingArr = async (
    arr: number[],
    sortingDirection: Direction
  ) => {
    setIsChanging(true);
    setModifiedIndexes([]);

    let changingIndexes: number[] = [];
    let modifiedIndexes: number[] = [];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - (i + 1); j++) {
        changingIndexes = [];

        changingIndexes.push(j);
        changingIndexes.push(j + 1);

        await new Promise((resolve) => setTimeout(resolve, 500));
        setChangingIndexes([...changingIndexes]);

        if (sortingDirection === Direction.Ascending) {
          if (arr[j + 1] < arr[j]) {
            [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
            setItems(arr);
          }
        } else if (sortingDirection === Direction.Descending) {
          if (arr[j + 1] > arr[j]) {
            [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
            setItems(arr);
          }
        }
      }

      modifiedIndexes.push(arr.length - (i + 1));
      setModifiedIndexes([...modifiedIndexes]);
    }

    setChangingIndexes([]);
    setIsChanging(false);
  };

  return (
    <SolutionLayout title='Сортировка массива'>
      <div className={styles.menu}>
        <div className={styles['radio-buttons-wrapper']}>
          <RadioInput
            label='Выбор'
            checked={sortingMethod === 'Выбор'}
            name='Метод сортировки'
            value='Выбор'
            onChange={handleSortingMethodChange}
            disabled={isChanging}
          />
          <RadioInput
            label='Пузырёк'
            name='Метод сортировки'
            value='Пузырёк'
            checked={sortingMethod === 'Пузырёк'}
            onChange={handleSortingMethodChange}
            disabled={isChanging}
          />
        </div>
        <div className={styles['direction-buttons-wrapper']}>
          <Button
            text='По возрастанию'
            sorting={Direction.Ascending}
            value={Direction.Ascending}
            onClick={(evt) => {
              handleSortingDirectionChange(evt);
              handleButtonClick(evt);
            }}
            disabled={
              isChanging &&
              (currentButtonValue === Direction.Descending ||
                currentButtonValue === 'Новый массив')
            }
            isLoader={isChanging && currentButtonValue === Direction.Ascending}
          />
          <Button
            text='По убыванию'
            sorting={Direction.Descending}
            value={Direction.Descending}
            onClick={(evt) => {
              handleSortingDirectionChange(evt);
              handleButtonClick(evt);
            }}
            isLoader={isChanging && currentButtonValue === Direction.Descending}
            disabled={
              isChanging &&
              (currentButtonValue === Direction.Ascending ||
                currentButtonValue === 'Новый массив')
            }
          />
        </div>
        <div className={styles['random-array-button-wrapper']}>
          <Button
            text='Новый массив'
            value='Новый массив'
            onClick={(evt) => {
              handleRandomArrayButtonClick();
              handleButtonClick(evt);
            }}
            isLoader={isChanging && currentButtonValue === 'Новый массив'}
            disabled={
              isChanging &&
              (currentButtonValue === Direction.Ascending ||
                currentButtonValue === Direction.Descending)
            }
          />
        </div>
      </div>
      <div className={styles.columns}>
        {items.map((item, index) => {
          const changingState = changingIndexes.includes(index);
          const modifiedState = modifiedIndexes.includes(index);

          return (
            <Column
              key={index}
              index={item}
              state={
                modifiedState
                  ? ElementStates.Modified
                  : changingState
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
