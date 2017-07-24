import { put } from 'redux-saga/effects'
import * as locationActions from '../actions/location'
import * as locationApi from '../api/location'
import { errorHandling, typeSucc, typeFail } from '../config'

function * getProvince (action) {
  try {
    const {data} = yield locationApi.getProvince(action)
    yield put({ type: typeSucc(locationActions.GET_PROVINCE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(locationActions.GET_PROVINCE), e)
  }
}

function * getDistrict (action) {
  try {
    const {data} = yield locationApi.getDistrict(action)
    yield put({ type: typeSucc(locationActions.GET_DISTRICT), ...data })
  } catch (e) {
    yield errorHandling(typeFail(locationActions.GET_DISTRICT), e)
  }
}

function * getSubDistrict (action) {
  try {
    const {data} = yield locationApi.getSubDistrict(action)
    yield put({ type: typeSucc(locationActions.GET_SUBDISTRICT), ...data })
  } catch (e) {
    yield errorHandling(typeFail(locationActions.GET_SUBDISTRICT), e)
  }
}

function * getVillage (action) {
  try {
    const {data} = yield locationApi.getVillage(action)
    yield put({ type: typeSucc(locationActions.GET_VILLAGE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(locationActions.GET_VILLAGE), e)
  }
}

export {
  getProvince,
  getDistrict,
  getSubDistrict,
  getVillage
}
