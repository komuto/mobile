import * as actions from '../actions/bank'
import { buildReducer, buildType, initState } from '../config'

const initListBank = {
  banks: [],
  ...initState()
}

const initBank = {
  bank: '',
  ...initState()
}

const initBankAccount = {
  bankAccount: {},
  ...initState()
}

function listBank (state = initListBank, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.LIST_BANK:
      return buildReducer(state, action, type, 'banks')
    default:
      return state
  }
}

function getBank (state = initBank, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_BANK:
      return buildReducer(state, action, type, 'bank')
    default:
      return state
  }
}

export const bankAccount = (state = initBankAccount, action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.ADD_BANK_ACCOUNT:
      return buildReducer(state, action, type, 'bankAccount')
    default:
      return state
  }
}

export {
  listBank,
  getBank
}
