import React, { useState, useEffect } from 'react';
import {useRecoilTransactionObserver_UNSTABLE, useRecoilCallback, useRecoilSnapshot} from 'recoil';
import { listState } from '../Atoms/atoms.js'

export function Console() {


  // THESE ARE JUST TESTS IGNORE

  // const [history, setHistory] = useState([])

  // console.log(useRecoilTransactionObserver_UNSTABLE)
  // console.log(useRecoilCallback)
  // useRecoilTransactionObserver_UNSTABLE((e) => {
  //   console.log('previous state:', e.previousSnapshot)
  //   console.log('current state:', e.snapshot)
  //   console.log('', e.snapshot)
  // })

  // useRecoilCallback((e) => {
  //   console.log('hello')
  // })
  // return null;
  
  const snapshot = useRecoilSnapshot();
  // console.log('snapshot:', snapshot);
  // console.log(snapshot.getLoadable(listState).contents);
  // console.log(snapshot.getLoadable(listState))

  // if (snapshot._store.getState().currentTree.atomValues.get('listState') && snapshot._store.getState().currentTree.atomValues.get('listState2')) {
    // console.log('atom values: ', snapshot._store.getState().currentTree);
    // console.log('listState atom: ', snapshot._store.getState().currentTree.atomValues.get('listState').contents);
    // console.log('listState2 atom: ', snapshot._store.getState().currentTree.atomValues.get('listState2').contents);
  // }
  
  // read snapshot when component updated.
  useEffect(() => {

    const atomValues = {};

    console.log('dirty Atoms: ', snapshot._store.getState().currentTree.dirtyAtoms)

    Array.from(snapshot._store.getState().currentTree.atomValues.keys()).forEach(key => {
      atomValues[key] = snapshot._store.getState().currentTree.atomValues.get(key)
    })

    // check if there are atoms
    if (snapshot._store.getState().currentTree.atomValues.size !== 0) {
      window.localStorage.setItem('atomHistory', JSON.stringify([...JSON.parse(window.localStorage.getItem('atomHistory')), atomValues]))
    }
  })

  useEffect(() => {
    // we should read in default state of the atoms and intialize local storage with that.
    window.localStorage.setItem('atomHistory', JSON.stringify([]))
  }, [])

  return null;
}

// export function Console() {

//   const [snapshots, setSnapshots] = useState([])
//   const snapshot = useRecoilSnapshot();

//   const addSnapshot = () => {
//     setSnapshots([...snapshots, snapshot]);
//   }

//   console.log(snapshots)

//   return <div></div>;
// }