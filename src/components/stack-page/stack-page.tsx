import React, {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import styles from './stack-page.module.css';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';

type TCurrentButtonValue = 'Добавить' | 'Удалить' | 'Очистить' | null;

interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  peak: () => T | null;
  toArray: () => T[];
}

class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T) => {
    this.container[this.container.length] = item;
  };

  pop = () => {
    this.container.length = this.container.length - 1;
  };

  peak = () => {
    return this.container[this.container.length - 1];
  };

  clear = () => {
    this.container.length = 0;
  };

  toArray = () => {
    return this.container;
  };
}

export const StackPage: React.FC = () => {
  const stack = useMemo(() => new Stack<string>(), []);
  const [stackItems, setStackItems] = useState<string[]>(stack.toArray());
  const [inputValue, setInputValue] = useState<string>('');
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [currentButtonValue, setCurrentButtonValue] =
    useState<TCurrentButtonValue>(null);

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const onAddButtonClick = async () => {
    setInputValue('');
    stack.push(inputValue);

    setStackItems([...stack.toArray()]);

    setIsChanging(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsChanging(false);
  };

  const onDeleteButtonClick = async () => {
    setIsChanging(true);

    await new Promise((resolve) => setTimeout(resolve, 500));
    stack.pop();
    setStackItems([...stack.toArray()]);

    setIsChanging(false);
  };

  const onClearButtonClick = () => {
    stack.clear();
    setStackItems([...stack.toArray()]);
  };

  const handleButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    setCurrentButtonValue(evt.currentTarget.value as TCurrentButtonValue);
  };

  useEffect(() => {
    if (!isChanging) {
      setCurrentButtonValue(null);
    }
  }, [isChanging]);

  return (
    <SolutionLayout title='Стек'>
      <div className={styles.wrapper}>
        <Input
          placeholder='Введите текст'
          isLimitText={true}
          maxLength={4}
          extraClass='input'
          value={inputValue}
          onChange={onInputChange}
          data-testid='input'
        />
        <Button
          text='Добавить'
          onClick={(evt) => {
            onAddButtonClick();
            handleButtonClick(evt);
          }}
          value='Добавить'
          disabled={
            inputValue === '' ||
            (isChanging &&
              (currentButtonValue === 'Добавить' ||
                currentButtonValue === 'Очистить'))
          }
          isLoader={isChanging && currentButtonValue === 'Добавить'}
          data-testid='addButton'
        />
        <Button
          text='Удалить'
          onClick={(evt) => {
            onDeleteButtonClick();
            handleButtonClick(evt);
          }}
          value='Удалить'
          disabled={
            !!!stackItems.length ||
            (isChanging &&
              (currentButtonValue === 'Добавить' ||
                currentButtonValue === 'Очистить'))
          }
          isLoader={isChanging && currentButtonValue === 'Удалить'}
          data-testid='removeButton'
        />
        <div className={styles['clear-button-wrapper']}>
          <Button
            text='Очистить'
            onClick={(evt) => {
              onClearButtonClick();
              handleButtonClick(evt);
            }}
            value='Очистить'
            disabled={
              !!!stackItems.length ||
              (isChanging &&
                (currentButtonValue === 'Добавить' ||
                  currentButtonValue === 'Удалить'))
            }
            isLoader={isChanging && currentButtonValue === 'Очистить'}
            data-testid='clearButton'
          />
        </div>
      </div>
      <div className={styles['items-wrapper']}>
        {stackItems.map((item, index) => {
          return (
            <Circle
              key={index}
              letter={item}
              index={index}
              head={stackItems.length - 1 === index ? 'top' : ''}
              state={
                stackItems.length - 1 === index && isChanging
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
