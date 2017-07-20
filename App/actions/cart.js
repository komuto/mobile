export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST'
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS'
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE'

export const addToCart = (params) => {
  return {
    type: ADD_TO_CART_REQUEST,
    ...params
  }
}
