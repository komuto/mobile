import { takeEvery, put } from 'redux-saga/effects'
import * as user_actions from '../actions/user'
import * as user_api from '../api/user'

function* login(actions) {
  try {
    const {data} = yield user_api.login(actions)
    console.log({data})
    yield put({ type: user_actions.USER_LOGIN_SUCCESS, ...data})
  } catch (e) {
    yield put({ type: user_actions.USER_LOGIN_FAILURE })
  }
}

export {
  login
}
