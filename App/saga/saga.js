import * as userActions from '../actions/user'
import * as userSaga from './user'
import { takeEvery } from 'redux-saga/effects'

function* dataSaga () {
  yield takeEvery(userActions.USER_LOGIN_REQUEST, userSaga.login)
}

export default dataSaga
