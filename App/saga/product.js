import { put } from 'redux-saga/effects'
import * as productActions from '../actions/product'
import * as productApi from '../api/product'
import { errorHandling, typeSucc, typeFail } from '../config'

function * getProduct (action) {
  try {
    const {data} = yield productApi.getProduct(action)
    yield put({ type: typeSucc(productActions.GET_PRODUCT), ...data })
  } catch (e) {
    yield errorHandling(typeFail(productActions.GET_PRODUCT), e)
  }
}

function * productByCategory (action) {
  try {
    const {data} = yield productApi.productBy(action)
    yield put({ type: typeSucc(productActions.LIST_PRODUCT_BY_CATEGORY), ...data })
  } catch (e) {
    yield errorHandling(typeFail(productActions.LIST_PRODUCT_BY_CATEGORY), e)
  }
}

function * productBySearch (action) {
  try {
    const {data} = yield productApi.productBy(action)
    yield put({ type: typeSucc(productActions.LIST_PRODUCT_BY_SEARCH), ...data })
  } catch (e) {
    yield errorHandling(typeFail(productActions.LIST_PRODUCT_BY_SEARCH), e)
  }
}

function * addToWishlist (action) {
  try {
    const {data} = yield productApi.addToWishlist(action)
    yield put({ type: typeSucc(productActions.ADD_TO_WISHLIST), ...data })
  } catch (e) {
    yield errorHandling(typeFail(productActions.ADD_TO_WISHLIST), e)
  }
}

function * addToWishlistHome (action) {
  try {
    const {data} = yield productApi.addToWishlistHome(action)
    yield put({ type: typeSucc(productActions.ADD_TO_WISHLIST_HOME), ...data })
  } catch (e) {
    yield errorHandling(typeFail(productActions.ADD_TO_WISHLIST_HOME), e)
  }
}

function * getDiscussion (action) {
  try {
    const {data} = yield productApi.getDiscussion(action)
    yield put({ type: typeSucc(productActions.GET_DISCUSSION), ...data })
  } catch (e) {
    yield errorHandling(typeFail(productActions.GET_DISCUSSION), e)
  }
}

function * newDiscussion (action) {
  try {
    const {data} = yield productApi.newDiscussion(action)
    yield put({ type: typeSucc(productActions.NEW_DISCUSSION), ...data })
  } catch (e) {
    yield errorHandling(typeFail(productActions.NEW_DISCUSSION), e)
  }
}

function * newComment (action) {
  try {
    const {data} = yield productApi.newComment(action)
    yield put({ type: typeSucc(productActions.NEW_COMMENT), ...data })
  } catch (e) {
    yield errorHandling(typeFail(productActions.NEW_COMMENT), e)
  }
}

function * getComment (action) {
  try {
    const {data} = yield productApi.getComment(action)
    yield put({ type: typeSucc(productActions.GET_COMMENT), ...data })
  } catch (e) {
    yield errorHandling(typeFail(productActions.GET_COMMENT), e)
  }
}

function * reportProduct (action) {
  try {
    const {data} = yield productApi.reportProduct(action)
    yield put({ type: typeSucc(productActions.REPORT_PRODUCT), ...data })
  } catch (e) {
    yield errorHandling(typeFail(productActions.REPORT_PRODUCT), e)
  }
}

export {
    getProduct,
    productByCategory,
    productBySearch,
    addToWishlist,
    addToWishlistHome,
    getDiscussion,
    newDiscussion,
    newComment,
    getComment,
    reportProduct
}
