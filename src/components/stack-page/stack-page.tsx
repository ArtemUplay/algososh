import React, { ChangeEvent, useMemo, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import styles from './stack-page.module.css';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';

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

  const onDeleteButtonClick = () => {
    stack.pop();
    setStackItems([...stack.toArray()]);
  };

  const onClearButtonClick = () => {
    stack.clear();
    setStackItems([...stack.toArray()]);
  };

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
        />
        <Button
          text='Добавить'
          onClick={onAddButtonClick}
          disabled={!inputValue}
          isLoader={isChanging}
        />
        <Button
          text='Удалить'
          onClick={onDeleteButtonClick}
          disabled={!!!stackItems.length || isChanging}
        />
        <div className={styles['clear-button-wrapper']}>
          <Button
            text='Очистить'
            onClick={onClearButtonClick}
            disabled={!!!stackItems.length || isChanging}
          />
        </div>
      </div>
      <div className={styles['items-wrapper']}>
        {stackItems &&
          stackItems.map((item, index) => {
            return (
              <Circle
                key={index}
                letter={item}
                index={index}
                head={stack.peak() === item ? 'top' : ''}
                state={
                  stack.peak() === item && isChanging
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
