export const reverseByTwoPointers = (arr: string[]) => {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];

    start++;
    end--;
  }

  return arr;
};

export const choiceSortingArr = (arr: number[]): number[] => {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }

  return arr;
};

export const bubbleSortingArr = (arr: number[]): number[] => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - (i + 1); j++) {
      if (arr[j + 1] < arr[j]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
      }
    }
  }

  return arr;
};
