import { combineReducers } from 'redux'
import * as storage from 'redux-storage'
import * as user_reducers from './user'

const komutoApps = storage.reducer(combineReducers({
  user: user_reducers.auth,
}))

export default komutoApps
