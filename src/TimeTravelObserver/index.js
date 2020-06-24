import React, { useState } from 'react';
import {
  useRecoilTransactionObserver_UNSTABLE,
  useGotoRecoilSnapshot,
} from 'recoil';

function TimeTravelObserver() {
  const [snapshots, setSnapshots] = useState([]);
  const [isRestoredState, setRestoredState] = useState(false);

  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    if (!isRestoredState) {
      setSnapshots([...snapshots, snapshot]);
    } else {
      setRestoredState(false);
    }
  });
  const gotoSnapshot = useGotoRecoilSnapshot();
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
export default TimeTravelObserver;