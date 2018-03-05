import { types } from 'mobx-state-tree';
import { observe } from 'mobx';

const Location = types.model('Location', {
  key: '',
  pathname: '',
  search: '',
  hash: '',
  state: types.frozen,
});

// tslint:disable-next-line:no-any
export const syncHistoryWithStore = (history: any, store: any) => {
  store._updateHistory(history);

  // Handle update from history object
  // tslint:disable-next-line:no-any
  const handleLocationChange = (location: any) => {
    store._updateLocation(location);
  };
  const unsubscribeFromHistory = history.listen(handleLocationChange);
  handleLocationChange(history.location);

  // tslint:disable-next-line:no-any
  const subscribe = (listener: any) => {
    // tslint:disable-next-line:no-any
    const onStoreChange = (change: any) => {
      const rawLocation = { ...store.location };
      listener(rawLocation, history.action);
    };

    // Listen for changes to location state in store
    const unsubscribeFromStore = observe(store, 'location', onStoreChange);

    listener(store.location, history.action);

    return () => {
      unsubscribeFromStore();
    };
  };
  const unsubscribe = () => unsubscribeFromHistory();

  history.subscribe = subscribe;
  history.unsubscribe = unsubscribe;

  return history;
};

export const RouterStore = types
  .model('RouterStore', {
    location: types.optional(Location, {
      key: '',
      pathname: '',
      search: '',
      hash: '',
      state: {},
    }),
  })
  .actions(self => {
    // tslint:disable-next-line:no-any
    let history: any;
    return {
      // tslint:disable-next-line:no-any
      _updateLocation(newState: any) {
        self.location = newState;
      },
      // tslint:disable-next-line:no-any
      _updateHistory(initialHistory: any) {
        history = initialHistory;
      },
      // tslint:disable-next-line:no-any
      push(location: any) {
        history.push(location);
      },
      // tslint:disable-next-line:no-any
      replace(location: any) {
        history.replace(location);
      },
      // tslint:disable-next-line:no-any
      go(n: any) {
        history.go(n);
      },
      goBack() {
        history.goBack();
      },
      goForward() {
        history.goForward();
      },
    };
  });
