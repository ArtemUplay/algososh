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
import styles from './queue-page.module.css';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';

type TCurrentButtonValue = 'Добавить' | 'Удалить' | 'Очистить' | null;

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill(null);
  }

  enqueue = (item: T) => {
    if (this.isFull()) {
      throw new Error('Maximum length exceeded');
    }

    this.container[this.tail % this.size] = item;
    this.tail++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }

    this.container[this.head % this.size] = null;
    this.head++;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }

    return this.container[this.head % this.size];
  };

  getQueue = (): (T | null)[] => {
    return this.container;
  };

  getTail = (): number => {
    return this.tail;
  };

  getHead = (): number => {
    return this.head;
  };

  clearQueue = () => {
    this.container.fill(null);
    this.head = 0;
    this.tail = 0;
  };

  isEmpty = () => this.container.length === 0;
  isFull = () => this.tail - this.head === this.size;
}

export const QueuePage: React.FC = () => {
  const queue = useMemo(() => new Queue<string>(7), []);

  const [queueItems, setQueueItems] = useState<(string | null)[]>(
    queue.getQueue()
  );
  const [inputValue, setInputValue] = useState<string>('');
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [currentButtonValue, setCurrentButtonValue] =
    useState<TCurrentButtonValue>(null);

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const onAddButtonClick = async () => {
    setIsChanging(true);

    if (queueItems[queueItems.length - 1]) {
      setIsChanging(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    queue.enqueue(inputValue);

    setIsChanging(false);
    setQueueItems([...queue.getQueue()]);
    setInputValue('');
  };

  const onDeleteButtonClick = async () => {
    setIsDeleting(true);

    await new Promise((resolve) => setTimeout(resolve, 500));
    queue.dequeue();

    setQueueItems([...queue.getQueue()]);
    setIsDeleting(false);
  };

  const onClearButtonClick = () => {
    queue.clearQueue();
    setQueueItems(queue.getQueue());
  };

  useEffect(() => {
    if (!isChanging) {
      setCurrentButtonValue(null);
    }
  }, [isChanging]);

  const handleButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    setCurrentButtonValue(evt.currentTarget.value as TCurrentButtonValue);
  };

  return (
    <SolutionLayout title='Очередь'>
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
          value='Добавить'
          disabled={
            inputValue === '' ||
            ((isChanging || isDeleting) &&
              (currentButtonValue === 'Добавить' ||
                currentButtonValue === 'Очистить'))
          }
          onClick={(evt) => {
            onAddButtonClick();
            handleButtonClick(evt);
          }}
          isLoader={isChanging && currentButtonValue === 'Добавить'}
        />
        <Button
          text='Удалить'
          value='Удалить'
          disabled={
            queue.isEmpty() ||
            (isChanging &&
              (currentButtonValue === 'Добавить' ||
                currentButtonValue === 'Очистить'))
          }
          onClick={(evt) => {
            onDeleteButtonClick();
            handleButtonClick(evt);
          }}
          isLoader={
            (isChanging || isDeleting) && currentButtonValue === 'Удалить'
          }
        />
        <div className={styles['clear-button-wrapper']}>
          <Button
            text='Очистить'
            value='Очистить'
            disabled={
              queue.isEmpty() ||
              ((isChanging || isDeleting) &&
                (currentButtonValue === 'Добавить' ||
                  currentButtonValue === 'Удалить'))
            }
            onClick={(evt) => {
              onClearButtonClick();
              handleButtonClick(evt);
            }}
            isLoader={isChanging && currentButtonValue === 'Очистить'}
          />
        </div>
      </div>
      <div className={styles['items-wrapper']}>
        {queueItems.map((item, index) => {
          return (
            <Circle
              key={index}
              index={index}
              letter={item || ''}
              head={index === queue.getHead() && item !== null ? 'head' : null}
              tail={
                item !== null && queue.getTail() - 1 === index ? 'tail' : null
              }
              state={
                (isChanging && queue.getTail() === index) ||
                (index === queue.getHead() && item !== null && isDeleting)
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
