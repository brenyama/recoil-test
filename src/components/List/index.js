import React from 'react';
import { ListItem } from '../ListItem';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { listState } from '../../Atoms/atoms.js';

export function List(props) {
  const [list, setList] = useRecoilState(listState);

  const addListItem = () => {
    setList(oldList => [
        ...oldList,
        {
          text: 'list item'
        }
    ])
  }

  const deleteListItem = (listItemIndex) => {
    setList(oldList => {
      const oldListCopy = [...oldList]
      oldListCopy.splice(listItemIndex, 1);
      return oldListCopy;
    });
  }
  
  const listItemsRender = list.map((listItem, index) => {
    return <ListItem key={`listItem-${index}`} text={listItem.text + ' ' + index} deleteListItem={() => {deleteListItem(index)}} />
  })

  return (
    <div className='list-container'>
      {listItemsRender}
      <button className='list-add-listItem' onClick={addListItem}>Add another item</button>
    </div>
  )
}