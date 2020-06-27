import React from 'react';
import './App.css';
import { List } from './components/List';
import { List2 } from './components/List2';
import { Header } from './components/Header';
import { listState, listState2 } from './Atoms/atoms.js';
import {
  useRecoilState,
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
      <div className="App">
        <Header />
        <List />
        <List2 />
      </div>
      <button onClick={addItemsToBothLists}>add to both lists</button>
    </div>
  );
}

export default App;
