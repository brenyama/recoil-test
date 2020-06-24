import React from 'react';
import './App.css';
import { List } from './List';
import { List2 } from './List2';
import { Header } from './Header';
import { Console } from './Console';
import { listState, listState2 } from './Atoms/atoms.js';
import TimeTravelObserver from './TimeTravelObserver';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

function App() {

  const [list, setList] = useRecoilState(listState);
  const [list2, setList2] = useRecoilState(listState2);

  const addItemsToBothLists = () => {
    setList(oldList => [
      ...oldList,
      {
        text: 'list item'
      }
    ])

    setList2(oldList2 => [
      ...oldList2,
      {
        text: 'list item'
      }
    ])
  }

  return (
    <div>
      <Console />
      <div className="App">
        <Header />
        <List />
        <List2 />
      </div>
      <TimeTravelObserver />
      <button onClick={addItemsToBothLists}>add to both lists</button>
    </div>
  );
}

export default App;
