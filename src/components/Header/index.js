import React from 'react'
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import { listState } from '../../Atoms/atoms.js';

export function Header(props) {
  const list = useRecoilValue(listState)

  return(
    <div className='header-container'>List Count: {list.length}</div>
  ) 
}