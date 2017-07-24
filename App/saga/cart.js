import { put } from 'redux-saga/effects'
import * as actions from '../actions/cart'
import * as apis from '../api/cart'
import { errorHandling, typeSucc, typeFail } from '../config'

export const addToCart = function* (action) {
  try {
    const { data } = yield apis.addToCart(action)
    yield put({ type: typeSucc(actions.ADD_TO_CART), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.ADD_TO_CART), e)
  }
}
