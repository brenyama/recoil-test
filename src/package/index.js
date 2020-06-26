import React, { useState, useEffect } from 'react';
import {useRecoilTransactionObserver_UNSTABLE, useRecoilSnapshot, useGotoRecoilSnapshot} from 'recoil';

export default function Recoilize() {
  
  const [snapshots, setSnapshots] = useState([]);
  const [isRestoredState, setRestoredState] = useState(false);

  const gotoSnapshot = useGotoRecoilSnapshot();
  const snapshot = useRecoilSnapshot();
  
  // read snapshot when component updated.
  useEffect(() => {

    const atomValues = {};

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

  // THIS IS FOR TIME TRAVEL
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    if (!isRestoredState) {
      setSnapshots([...snapshots, snapshot]);
    } else {
      setRestoredState(false);
    }
  });

  return (
    <ol>
      {snapshots.map((snapshot, i) => (
        <li key={i}>
          Snapshot {i}
          <button onClick={async () => {
            // another function
            await setRestoredState(true);
            gotoSnapshot(snapshot)
          }}>Restore</button>
        </li>
      ))}
    </ol>
  );
}