import { put } from 'redux-saga/effects'
import * as storeActions from '../actions/stores'
import * as storeApi from '../api/stores'
import { errorHandling, typeSucc, typeFail } from '../config'

function * getStores (action) {
  try {
    const {data} = yield storeApi.getStores(action)
    yield put({ type: typeSucc(storeActions.GET_STORE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(storeActions.GET_STORE), e)
  }
}

function * createStore (action) {
  try {
    const {data} = yield storeApi.createStore(action)
    yield put({ type: typeSucc(storeActions.CREATE_STORE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(storeActions.CREATE_STORE), e)
  }
}

function * storeExpeditionList (action) {
  try {
    const {data} = yield storeApi.storeExpeditionList()
    yield put({ type: typeSucc(storeActions.STORE_EXPEDITIONLIST), ...data })
  } catch (e) {
    yield errorHandling(typeFail(storeActions.STORE_EXPEDITIONLIST), e)
  }
}

function * storeExpeditionManage (action) {
  try {
    const {data} = yield storeApi.storeExpeditionManage()
    yield put({ type: typeSucc(storeActions.STORE_EXPEDITIONMANAGE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(storeActions.STORE_EXPEDITIONMANAGE), e)
  }
}

function * photoUpload (action) {
  try {
    const {data} = yield storeApi.photoUpload(action)
    yield put({ type: typeSucc(storeActions.PHOTO_UPLOAD), ...data })
  } catch (e) {
    yield errorHandling(typeFail(storeActions.PHOTO_UPLOAD), e)
  }
}

function * verifyStore (action) {
  try {
    const {data} = yield storeApi.verifyStore(action)
    yield put({ type: typeSucc(storeActions.VERIFY_STORE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(storeActions.VERIFY_STORE), e)
  }
}

function * sendMessageStore (action) {
  try {
    const {data} = yield storeApi.sendMessageStore(action)
    yield put({ type: typeSucc(storeActions.MESSAGE_STORE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(storeActions.MESSAGE_STORE), e)
  }
}

export {
  getStores,
  createStore,
  photoUpload,
  storeExpeditionList,
  storeExpeditionManage,
  verifyStore,
  sendMessageStore
}
