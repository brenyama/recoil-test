import React, { useState, useEffect } from 'react';
import {useRecoilTransactionObserver_UNSTABLE, useRecoilSnapshot, useGotoRecoilSnapshot, useRecoilValue, useRecoilValueLoadable} from 'recoil';

export default function Recoilize(props) {

  // DEBUG MESSAGES
  // grabs the React FIBER NODE of the application
  // console.log(document.getElementById('root')._reactRootContainer)

  // grabs all atoms that were defined to get the initial state
  const nodes = Object.values(props.nodes)

  // DEBUG MESSAGES
  // console.log('these are the nodes provided: ', nodes)
  
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
    const currentTree = snapshot._store.getState().currentTree;
    const selectorNodeKeys = Array.from(currentTree.nodeDeps.keys());
    const atomNodeKeys = Array.from(currentTree.nodeToNodeSubscriptions.keys());

    // DEBUG MESSAGES
    // console.log('below me is _store.getState()')
    // console.log(snapshot._store.getState())

    nodes.forEach((node, index) => {

      // DEBUG MESSAGES
      // console.log('snapshot.getLoadable of ', node, ' ------')
      // console.log(snapshot.getLoadable(node))
      // console.log('------')

      const type = atomNodeKeys.includes(node.key) ? 'atom' : selectorNodeKeys.includes(node.key) ? 'selector' : null
      const contents = snapshot.getLoadable(node).contents;
      const nodeDeps = currentTree.nodeDeps.get(node.key);
      const nodeToNodeSubscriptions = currentTree.nodeToNodeSubscriptions.get(node.key);

      filteredSnapshot[node.key] = {
        type,
        contents,
        nodeDeps: nodeDeps ? Array.from(nodeDeps) : [],
        nodeToNodeSubscriptions : nodeToNodeSubscriptions ? Array.from(nodeToNodeSubscriptions) : []
      }
    })

    // Post message to content script on every re-render of the developers application only if content script has started
    sendWindowMessage('recordSnapshot', filteredSnapshot)

    // Checks to see if content script has started before sending initial snapshot
    window.addEventListener('message', ({ data: { action } }) => {
      // DEBUG MESSAGES
      // console.log('recoilize modules says this is the action:', action)

      // add other actions from dev tool here
      // TODO: set up time travel feature as case for module to listen for.
      switch (action) {
        case 'contentScriptStarted':
          sendWindowMessage('moduleInitialized', filteredSnapshot);
          break;
        default:
      }
    });
  })

  const sendWindowMessage = (action, payload) => {
    window.postMessage({
      action,
      payload,
    })
  }

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