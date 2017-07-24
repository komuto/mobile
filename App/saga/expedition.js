import { put } from 'redux-saga/effects'
import * as expeditionActions from '../actions/expedition'
import * as expeditionApi from '../api/expedition'
import { errorHandling, typeSucc, typeFail } from '../config'

function * getExpedition (action) {
  try {
    const {data} = yield expeditionApi.getExpedition(action)
    yield put({ type: typeSucc(expeditionActions.GET_EXPEDITION), ...data })
  } catch (e) {
    yield errorHandling(typeFail(expeditionActions.GET_EXPEDITION), e)
  }
}

function * getServices (action) {
  try {
    const {data} = yield expeditionApi.getServices(action)
    yield put({ type: typeSucc(expeditionActions.GET_EXPEDITION_SERVICES), ...data })
  } catch (e) {
    yield errorHandling(typeFail(expeditionActions.GET_EXPEDITION_SERVICES), e)
  }
}

function * estimatedCharge (action) {
  try {
    const {data} = yield expeditionApi.estimatedShipping(action)
    yield put({ type: typeSucc(expeditionActions.ESTIMATED_SHIPPING), ...data })
  } catch (e) {
    yield errorHandling(typeFail(expeditionActions.ESTIMATED_SHIPPING), e)
  }
}

function * getShippingCharge (action) {
  try {
    const {data} = yield expeditionApi.getShippingCharge(action)
    yield put({ type: typeSucc(expeditionActions.GET_SHIPPING_CHARGE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(expeditionActions.GET_SHIPPING_CHARGE), e)
  }
}

function * updateExpedition (action) {
  try {
    const {data} = yield expeditionApi.updateExpedition(action)
    yield put({ type: typeSucc(expeditionActions.UPDATE_EXPEDITION), ...data })
  } catch (e) {
    yield errorHandling(typeFail(expeditionActions.UPDATE_EXPEDITION), e)
  }
}

export {
  getExpedition,
  getServices,
  estimatedCharge,
  getShippingCharge,
  updateExpedition
}
