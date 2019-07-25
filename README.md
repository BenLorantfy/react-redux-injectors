# react-redux-injectors

## Api Reference

### `setupStoreForInjectors`
Sets up the redux store to support the reducer and saga injectors. After creating your store using redux's `createStore`, call `setupStoreForInjectors` and pass in the created store:  

| Parameter              | Description                          |
|------------------------|--------------------------------------|
| store                  | The redux store created with redux's `createStore`. |
| options.createReducer  | A function that should return the root reducer. It's passed the injected reducers as the only parameter |
| options.sagaMiddleware | The sagaMiddleware that is created with redux-saga's `createSagaMiddleware` |


```js
import { createStore } from "redux";
import { setupStoreForInjectors } from "react-redux-injectors";


function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    ...injectedReducers,
    // other non-injected reducers can go here...
  });

  return rootReducer;
}

const store = createStore(createReducer(), /** ... other options **/);

// Allow's react-redux-injectors to work
setupStoreForInjectors(store, { createReducer, sagaMiddleware });
```

### `checkStore`
Checks that the store has been setup properly for injectors to work. Will throw and log an error if not setup properly.
```js
import { checkStore } from "react-redux-injectors";

checkStore(store);
```

### `forceReducerReload`
Calls `createReducer` provided to `setupStoreForInjectors` and then calls `store.replaceReduccer` with this new reducer. Useful for hot-reloading.
```js
import { forceReducerReload } from "react-redux-injectors";

forceReducerReload(store);
```

### `injectReducer`

Adds a reducer to the redux store when the wrapped component is created.  

| Parameter       | Description                          |
|-----------------|--------------------------------------|
| options.key     | The key to inject the reducer under. |
| options.reducer | The reducer to inject                |


```js
class HomePage extends React.PureComponent {
  render() {
    ...
  }
}

export default injectReducer({ key: "HomePage", reducer: homePageReducer })(HomePage);
```

### `injectSaga`
Adds a saga to the redux store when the wrapped component is created.  

| Parameter       | Description                          |
|-----------------|--------------------------------------|
| options.key     | The key to inject the saga under. |
| options.saga    | The saga to inject                |
| options.mode    | Controls how the saga is injected/run                |

These are the possible injection modes. It defaults to DAEMON  

| Mode       | Description                           |
|-----------------|---------------------------------------|
| `DAEMON` (default)          | The saga will be started on component mount and never canceled or started again     |
| `RESTART_ON_REMOUNT`    | The saga will be started on component mount and cancelled with `task.cancel()` on component unmount for improved performance |
| `ONCE_TILL_UNMOUNT`    | Behaves like 'RESTART_ON_REMOUNT' but never runs it again |



```js
class HomePage extends React.PureComponent {
  render() {
    ...
  }
}

export default injectSaga({ key: "HomePage", saga: homePageSaga })(HomePage);
```
