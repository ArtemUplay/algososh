import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './string.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';

const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [letters, setLetters] = useState<string[]>([]);
  const [modifiedIndexes, setModifiedIndexes] = useState<number[]>([]);
  const [changingIndexes, setChangingIndexes] = useState<number[]>([]);

  const reverseByTwoPointers = async (arr: string[]) => {
    let start = 0;
    let end = arr.length - 1;

    const modifiedIndexes: number[] = [];
    const changingIndexes: number[] = [];

    while (start <= end) {
      modifiedIndexes.push(start);
      modifiedIndexes.push(end);
      changingIndexes.push(start + 1);
      changingIndexes.push(end - 1);

      [arr[start], arr[end]] = [arr[end], arr[start]];

      setLetters([...arr]);
      setModifiedIndexes([...modifiedIndexes]);
      setChangingIndexes([...changingIndexes]);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      start++;
      end--;
    }

    setIsChanging(false);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onClickButton = async () => {
    setIsChanging(true);
    setModifiedIndexes([]);

    const arr: string[] = [...inputValue.split('')];
    setLetters(arr);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reverseByTwoPointers(arr);

    setInputValue('');
  };

  return (
    <SolutionLayout title='Строка'>
      <div className={styles.wrapper}>
        <Input
          data-testid='input'
          maxLength={11}
          isLimitText={true}
          value={inputValue}
          onChange={onInputChange}
        />
        <Button
          data-testid='button'
          text='Развернуть'
          onClick={onClickButton}
          isLoader={isChanging}
          disabled={inputValue === ''}
          extraClass='button'
        />
      </div>
      <div className={styles.items}>
        {letters.map((item, index) => {
          const modifiedState = modifiedIndexes.includes(index);
          const changedState = changingIndexes.includes(index);

          return (
            <Circle
              key={index}
              letter={item}
              data-testid={`circle-component-id${index}`}
              state={
                modifiedState
                  ? ElementStates.Modified
                  : changedState
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

export default StringComponent;
