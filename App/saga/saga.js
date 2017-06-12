import * as user_actions from '../actions/user'
import * as user_saga from './user'
import { put, takeEvery } from 'redux-saga/effects'

function* dataSaga() {
  yield takeEvery(user_actions.USER_LOGIN_REQUEST, user_saga.login)
}

export default dataSaga
