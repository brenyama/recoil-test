import {
  atom,
  selector,
} from 'recoil';

export const listState = atom({
  key: 'listState',
  default: [],
})

export const listState2 = atom({
  key: 'listState2',
  default: [],
})

export const selectorTest = selector({
  key: 'selectorTest',
  get: ({get}) => {
    let val = get(listState);
    return 'test';
  }
})

export const stateLengths = selector({
  key: 'stateLengths',
  get: ({get}) => {
    let length1 = get(listState).length;
    let length2 = get(listState2).length;
    return length1 + length2;
  }
})