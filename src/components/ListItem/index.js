import React from 'react'

export function ListItem(props) {
  return (
    <div className={'listItem-container'}>{props.text}<button className={'listItem-delete'} onClick={props.deleteListItem}>delete</button></div>
  )
}