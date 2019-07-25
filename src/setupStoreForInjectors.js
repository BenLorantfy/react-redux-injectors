/**
 * @description Sets up the store to allow injectReducer and injectSaga to work. Mutates the store to allow this.
 */
export function setupStoreForInjectors(store, options) {
  store.createReducer = options.createReducer;
  store.runSaga = options.sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry
}
