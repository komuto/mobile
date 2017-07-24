import { put } from 'redux-saga/effects'
import * as wishlistActions from '../actions/wishlist'
import * as wishlistApi from '../api/wishlist'
import { errorHandling, typeSucc, typeFail } from '../config'

function* wishlist (action) {
  try {
    const {data} = yield wishlistApi.wishlist(action)
    console.log(data)
    yield put({ type: typeSucc(wishlistActions.GET_WISHLIST), ...data })
  } catch (e) {
    yield errorHandling(typeFail(wishlistActions.GET_WISHLIST), e)
  }
}

export {
    wishlist
}
