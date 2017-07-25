import * as actions from '../actions/cart'
import { buildReducer, buildType, initState } from '../config'

const initCart = {
  cart: [],
  ...initState()
}

const initPromo = {
  promo: {},
  ...initState()
}

export const cart = (state = initCart, action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.ADD_TO_CART:
      return buildReducer(state, action, type, 'cart')
    case actions.ADD_TO_CART_RESET:
      return initCart
    default:
      return state
  }
}

export const getPromo = (state = initPromo, action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_PROMO:
      return buildReducer(state, action, type, 'promo')
    default:
      return state
  }
}
