import { put } from 'redux-saga/effects'
import * as reviewActions from '../actions/review'
import * as reviewApi from '../api/review'
import { errorHandling, typeSucc, typeFail } from '../config'

function * getReview (action) {
  try {
    const {data} = yield reviewApi.getReview(action)
    yield put({ type: typeSucc(reviewActions.GET_REVIEW), ...data })
  } catch (e) {
    yield errorHandling(typeFail(reviewActions.GET_REVIEW), e)
  }
}

function * addReview (action) {
  try {
    const {data} = yield reviewApi.addReview(action)
    yield put({ type: typeSucc(reviewActions.ADD_REVIEW), ...data })
  } catch (e) {
    yield errorHandling(typeFail(reviewActions.ADD_REVIEW), e)
  }
}

function * listReviewPagination (action) {
  try {
    const {data} = yield reviewApi.listReviewPagination(action)
    yield put({ type: typeSucc(reviewActions.LIST_REVIEW), ...data })
  } catch (e) {
    yield errorHandling(typeFail(reviewActions.LIST_REVIEW), e)
  }
}

export {
  getReview,
  addReview,
  listReviewPagination
}
