import React, { ChangeEvent, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import styles from './fibonacci-page.module.css';
import { Circle } from '../ui/circle/circle';

export const FibonacciPage: React.FC = () => {
  const [values, setValues] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const onClickButton = () => {
    setIsLoading(true);
    countFibonacci(+inputValue);
  };

  const countFibonacci = async (num: number): Promise<void> => {
    const arr: number[] = [];

    if (num > 0) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      arr.push(1);
      setValues([...arr]);

      if (num > 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        arr.push(1);
        setValues([...arr]);

        let prevValue = 1;
        let currValue = 1;

        for (let i = 2; i < num; i++) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          let nextValue = prevValue + currValue;
          arr.push(nextValue);
          prevValue = currValue;
          currValue = nextValue;

          setValues([...arr]);
        }

        setIsLoading(false);
      }
    }
  };

  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <div className={styles.wrapper}>
        <Input
          isLimitText={true}
          type='number'
          max={19}
          value={inputValue}
          onChange={onInputChange}
          data-testid='input'
        />
        <Button
          text='Рассчитать'
          isLoader={isLoading}
          onClick={onClickButton}
          disabled={
            inputValue === '' || +inputValue > 19 || inputValue.includes('-')
          }
          data-testid='button'
        />
      </div>
      <div className={styles.circleContainer}>
        {values.map((item, index) => (
          <div
            key={index}
            className={`${styles.circle} ${
              index >= 10 ? styles.circleSecondRow : ''
            }`}
          >
            <Circle index={index} letter={String(item)} />
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
