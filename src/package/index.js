import React, { useState, useEffect } from 'react';
import {useRecoilTransactionObserver_UNSTABLE, useRecoilSnapshot, useGotoRecoilSnapshot, useRecoilValue} from 'recoil';

export default function Recoilize(props) {

  // grabs the React FIBER NODE of the application
  console.log(document.getElementById('root')._reactRootContainer)

  // grabs all atoms that were defined to get the initial state
  const atoms = Object.values(props.atoms)
  
  /* 
  TODO: Test time travel to past snapshot once we have pipeline hooked up
  
  const [snapshots, setSnapshots] = useState([]);
  const [isRestoredState, setRestoredState] = useState(false);
  const gotoSnapshot = useGotoRecoilSnapshot();
  */

  const snapshot = useRecoilSnapshot();
  
  // read snapshot when component updated.
  useEffect(() => {

    const filteredSnapshot = {};

    // if user hasn't triggered 1st re-render, construct filtered snapshot with initial atom state content
    if (snapshot._store.getState().currentTree.atomValues.size === 0) {
      atoms.forEach((atom, index) => {
        filteredSnapshot[atom.key] = {
          contents: snapshot.getLoadable(atom).contents
        }
      })
    } else {
      Array.from(snapshot._store.getState().currentTree.atomValues.keys()).forEach(key => {
        filteredSnapshot[key] = {
          contents: snapshot._store.getState().currentTree.atomValues.get(key).contents
        }
      })
    }

    window.postMessage({
      data: filteredSnapshot,
    })
  })

  // TODO : TEST LATER - THIS IS FOR TIME TRAVEL FEATURE
  // useRecoilTransactionObserver_UNSTABLE(({ previousSnapshot, snapshot }) => {
  //   if (!isRestoredState) {
  //     setSnapshots([...snapshots, snapshot]);
  //   } else {
  //     setRestoredState(false);
  //   }
  // });

  // return (
  //   <ol>
  //     {snapshots.map((snapshot, i) => (
  //       <li key={i}>
  //         Snapshot {i}
  //         <button onClick={async () => {
  //           // another function
  //           await setRestoredState(true);
  //           gotoSnapshot(snapshot)
  //         }}>Restore</button>
  //       </li>
  //     ))}
  //   </ol>
  // );

  return null;
}