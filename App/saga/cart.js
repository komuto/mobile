import { put } from 'redux-saga/effects'
import * as actions from '../actions/cart'
import * as apis from '../api/cart'
import { errorHandling } from '../config'

export const addToCart = function* (action) {
  console.log(action)
  try {
    const { data } = yield apis.addToCart(action)
    yield put({ type: actions.ADD_TO_CART_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(actions.ADD_TO_CART_FAILURE, e)
  }
}
