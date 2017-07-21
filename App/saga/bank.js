import { put } from 'redux-saga/effects'
import * as actions from '../actions/bank'
import * as apis from '../api/bank'
import { errorHandling, typeSucc, typeFail } from '../config'

function * listBank (action) {
  try {
    const {data} = yield apis.listBank(action)
    yield put({ type: actions.LIST_BANK_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(actions.LIST_BANK_FAILURE, e)
  }
}

function * getBank (action) {
  try {
    const {data} = yield apis.getBank(action)
    yield put({ type: actions.GET_BANK_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(actions.GET_BANK_FAILURE, e)
  }
}

export const addBankAccount = function* (action) {
  console.log(action)
  try {
    const { data } = yield apis.addBankAccount(action)
    yield put({ type: typeSucc(actions.ADD_BANK_ACCOUNT), ...data })
  } catch (e) {
    console.log(e)
    yield errorHandling(typeFail(actions.ADD_BANK_ACCOUNT), e)
  }
}

export {
  listBank,
  getBank
}
