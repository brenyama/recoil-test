import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

export const listState = atom({
  key: 'listState',
  default: [],
})

export const listState2 = atom ({
  key: 'listState2',
  default: [],
})