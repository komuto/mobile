import { buildAction, typeReq } from '../config'

export const ADD_TO_CART = 'ADD_TO_CART'
export const ADD_TO_CART_RESET = 'ADD_TO_CART_RESET'
export const GET_PROMO = 'GET_PROMO'

export const addToCart = params => buildAction(typeReq(ADD_TO_CART), params)
export const addToCartReset = () => buildAction(ADD_TO_CART_RESET)
export const getPromo = params => buildAction(typeReq(GET_PROMO), params)
