import { buildAction, typeReq } from '../config'

export const GET_PAYMENT_METHODS = 'GET_PAYMENT_METHODS'
export const CONFIRM_TRANSFER = 'CONFIRM_TRANSFER'

/**
 * @state paymentMethods
 */
export const getPaymentMethods = () => buildAction(typeReq(GET_PAYMENT_METHODS))

/**
 * @params id {int} bucket id
 * @params params are the same as the api
 * @state confirmation
 */
export const confirmTransfer = params => buildAction(typeReq(CONFIRM_TRANSFER), params)
