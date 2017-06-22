import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import komutoApps from './reducers/reducers'
import dataSaga from './saga/saga'

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(komutoApps, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(dataSaga)

export function token () {
  const state = store.getState()
  // return state.user.token
  return 'JWT ' + state.user.token
}
