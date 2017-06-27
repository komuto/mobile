import { put } from 'redux-saga/effects'
import * as homeActions from '../actions/home'
import * as homeApi from '../api/home'
import { errorHandling } from '../config'

function * product (action) {
  try {
    const {data} = yield homeApi.product(action)
    yield put({ type: homeActions.HOME_PRODUCT_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(homeActions.HOME_PRODUCT_FAILURE, e)
  }
}

function * search (action) {
  try {
    const {data} = yield homeApi.search(action)
    yield put({ type: homeActions.SEARCH_PRODUCT_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(homeActions.SEARCH_PRODUCT_FAILURE, e)
  }
}

function * categoryList (action) {
  try {
    const {data} = yield homeApi.categoryList(action)
    yield put({ type: homeActions.HOME_CATEGORY_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(homeActions.HOME_CATEGORY_FAILURE, e)
  }
}

function * subCategory (action) {
  try {
    const {data} = yield homeApi.subCategory(action)
    yield put({ type: homeActions.HOME_SUBCATEGORY_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(homeActions.HOME_SUBCATEGORY_FAILURE, e)
  }
}

export {
  product,
  search,
  categoryList,
  subCategory
}
