# Recoilize Notes

released 6/18 in v0.0.10

### Snapshot API Methods

#### To grab current snapshot
`const snapshot = useRecoilSnapshot();`

#### to grab current and previous snapshot (depracated method)
1. `useRecoilTransactionObserver_UNSTABLE((e) => {
    console.log('previous state:', e.previousSnapshot)
    console.log('current state:', e.snapshot)
    console.log('', e.snapshot)
  })`

#### to grab contents of a particular atoms
1. `snapshot.getLoadable(<atomObject>).contents`
get loadable lets you observe an individual atom before they have been invoked for the first time.
2. `snapshot._store.getState().currentTree.atomValues.get(<atom-key>).contents`

#### to grab all atoms in snapshot
1. Map type `snapshot._store.getState().currentTree.atomValues`

#### to grab all changed atoms from previous state
1. Set type `snapshot._store.getState().currentTree.dirtyAtoms`


#### we still need to figure out how to cache content of previous atoms and current atoms to display content differences.
1. Local Storage
2. State

#### we need to parse the difference between dirtyAtoms content and previous state content
