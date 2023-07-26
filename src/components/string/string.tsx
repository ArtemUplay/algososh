import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './string.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';

const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [letters, setLetters] = useState<string[]>([]);
  const [changingIndexes, setChangingIndexes] = useState<number[]>([]);

  const reverseByTwoPointers = async (arr: string[]) => {
    let start = 0;
    let end = arr.length - 1;
    const changingIndexes: number[] = [];

    while (start <= end) {
      changingIndexes.push(start);
      changingIndexes.push(end);
      [arr[start], arr[end]] = [arr[end], arr[start]];
      setLetters([...arr]);
      setChangingIndexes([...changingIndexes, start, end]);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      start++;
      end--;
    }
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onClickButton = async () => {
    setIsChanging(true);

    const arr: string[] = [...inputValue.split('')];
    setLetters(arr);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reverseByTwoPointers(arr);

    setIsChanging(false);
  };

  return (
    <SolutionLayout title='Строка'>
      <div className={styles.wrapper}>
        <Input
          maxLength={11}
          isLimitText={true}
          value={inputValue}
          onChange={onInputChange}
        />
        <Button
          text='Развернуть'
          onClick={onClickButton}
          isLoader={isChanging}
          disabled={inputValue === ''}
          extraClass='button'
        />
      </div>
      <div style={{}} className={styles.items}>
        {letters.map((item, index) => {
          console.log(changingIndexes);
          let state = changingIndexes.includes(index);

          return (
            <Circle
              key={index}
              letter={item}
              state={state ? ElementStates.Modified : ElementStates.Changing}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};

export default StringComponent;
