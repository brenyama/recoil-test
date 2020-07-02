import React, { useState, useEffect } from 'react';
import {useRecoilTransactionObserver_UNSTABLE, useRecoilSnapshot, useGotoRecoilSnapshot, useRecoilValue, useRecoilValueLoadable, useRecoilCallback} from 'recoil';

// isRestored state disables snapshots from being recorded
let isRestoredState = false;

export default function Recoilize(props) {

  // DEBUG MESSAGES
  // Grabs the React FIBER NODE of the application
  // console.log(document.getElementById('root')._reactRootContainer)

  // Captures all atoms that were defined to get the initial state
  const nodes = Object.values(props.nodes)

  const snapshot = useRecoilSnapshot();
  
  // Local state of all previous snapshots to use for time traveling when requested by dev tools.
  const [snapshots, setSnapshots] = useState([snapshot]);
  // const [isRestoredState, setRestoredState] = useState(false);
  const gotoSnapshot = useGotoRecoilSnapshot();

  const filteredSnapshot = {};
  const currentTree = snapshot._store.getState().currentTree;

  // Traverse all atoms and selector state nodes and get value 
  nodes.forEach((node, index) => {
    const type = node.__proto__.constructor.name
    const contents = snapshot.getLoadable(node).contents;
    const nodeDeps = currentTree.nodeDeps.get(node.key);
    const nodeToNodeSubscriptions = currentTree.nodeToNodeSubscriptions.get(node.key);

    // Construct node data structure for dev tool to consume
    filteredSnapshot[node.key] = {
      type,
      contents,
      nodeDeps: nodeDeps ? Array.from(nodeDeps) : [],
      nodeToNodeSubscriptions : nodeToNodeSubscriptions ? Array.from(nodeToNodeSubscriptions) : []
    }
  })
  
  // React lifecycle hook on re-render
  useEffect(() => {

    if (!isRestoredState) {
      // Post message to content script on every re-render of the developers application only if content script has started
      sendWindowMessage('recordSnapshot', filteredSnapshot)
    } else {
      isRestoredState = false;
    }

    // Window listener for messages from dev tool UI & background.js
    window.addEventListener('message', onMessageReceived);

    // Clears the window event listener.
    return () => window.removeEventListener('message', onMessageReceived);
    
  })

  // Listener callback for messages sent to window
  const onMessageReceived = (msg) => {

    // Add other actions from dev tool here
    switch (msg.data.action) {
      // Checks to see if content script has started before sending initial snapshot
      case 'contentScriptStarted':
        sendWindowMessage('moduleInitialized', filteredSnapshot);
        break;
      // Listens for a request from dev tool to time travel to previous state of the app.
      case 'snapshotTimeTravel':
        timeTravelToSnapshot(msg);
        break;
      default:
        break;
    }
  }

  // Sends window an action and payload message.
  const sendWindowMessage = (action, payload) => {
    window.postMessage({
      action,
      payload,
    })
  }

  // FOR TIME TRAVEL: time travels to a given snapshot, re renders application.
  const timeTravelToSnapshot = async (msg) => {
    // await setRestoredState(true);
    // await gotoSnapshot(snapshots[msg.data.payload.snapshotIndex]);
    // await setRestoredState(false);

    isRestoredState = true;
    await gotoSnapshot(snapshots[msg.data.payload.snapshotIndex]);
  }

  // FOR TIME TRAVEL: Recoil hook to fire a callback on every snapshot change
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    if (!isRestoredState) {
      setSnapshots([...snapshots, snapshot]);
    }
  });

  return null;
}