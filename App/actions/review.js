import { buildAction, typeReq } from '../config'

export const GET_REVIEW = 'GET_REVIEW'
export const LIST_REVIEW = 'LIST_REVIEW'
export const ADD_REVIEW = 'ADD_REVIEW'
export const ADD_REVIEW_RESET = 'ADD_REVIEW_RESET'

export const getReview = params => buildAction(typeReq(GET_REVIEW), params)
export const listReviewPagination = params => buildAction(typeReq(LIST_REVIEW), params)
export const addReview = params => buildAction(typeReq(ADD_REVIEW), params)
export const resetAddReview = () => buildAction(ADD_REVIEW_RESET)

