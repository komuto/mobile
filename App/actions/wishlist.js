import { buildAction, typeReq } from '../config'

export const GET_WISHLIST = 'GET_WISHLIST'

export const wishlist = () => buildAction(typeReq(GET_WISHLIST))
