import * as actions from '../actions/cart'

const initCart = {
  cart: [],
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

export const cart = (state = initCart, action) => {
  switch (action.type) {
    case actions.ADD_TO_CART_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.ADD_TO_CART_SUCCESS:
      return {
        cart: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.ADD_TO_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
        isFound: true,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}
