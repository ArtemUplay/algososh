import React, { useState, useEffect } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './string.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';

const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [circles, setCircles] = useState<string[]>([]);
  const [animationIndex, setAnimationIndex] = useState<number>(-1);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onClickButton = () => {
    setButtonClicked(true);
    setIsLoading(true);

    const arr = inputValue.split('');
    let start = 0;
    let end = inputValue.length - 1;

    const animationInterval = setInterval(() => {
      if (start >= end) {
        clearInterval(animationInterval);
        setIsLoading(false);
        // setButtonClicked(false);

        return;
      }

      const temp = arr[start];
      arr[start] = arr[end];
      arr[end] = temp;

      setCircles([...arr]);
      setAnimationIndex(start);

      start++;
      end--;
    }, 1000);
  };

  useEffect(() => {
    if (inputValue && circles.length > 0 && buttonClicked) {
      // setButtonClicked(false);
    }
  }, [inputValue, circles, buttonClicked]);

  return (
    <SolutionLayout title='Строка'>
      <div className={styles.wrapper}>
        <Input
          maxLength={11}
          isLimitText={true}
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button
          text='Развернуть'
          onClick={onClickButton}
          isLoader={isLoading}
        />
      </div>
      {buttonClicked && (
        <div
          style={{
            marginTop: '120px',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {circles.map((item, index) => {
            let state: ElementStates | undefined;

            if (
              index === animationIndex ||
              index === circles.length - animationIndex - 1
            ) {
              state = ElementStates.Changing; // Применить цвет #D252E1 к текущей букве
            } else if (
              index < animationIndex ||
              index > circles.length - animationIndex - 1
            ) {
              state = ElementStates.Modified; // Применить цвет #7FE051 к отсортированным буквам
            }

            return <Circle key={index} letter={item} state={state} />;
          })}
        </div>
      )}
    </SolutionLayout>
  );
};

export default StringComponent;
