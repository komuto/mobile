import { put } from 'redux-saga/effects'
import * as userActions from '../actions/user'
import * as userApi from '../api/user'

function* login (actions) {
  try {
    const {data} = yield userApi.login(actions)
    console.log({data})
    yield put({ type: userActions.USER_LOGIN_SUCCESS, ...data })
  } catch (e) {
    yield put({ type: userActions.USER_LOGIN_FAILURE })
  }
}

export {
  login
}
