import React from 'react'
import { listState2 } from '../Atoms/atoms.js'
import { useRecoilState } from 'recoil'
import { ListItem } from '../ListItem'

export function List2(props) {
  const [list, setList] = useRecoilState(listState2);

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