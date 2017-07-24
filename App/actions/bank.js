import { buildAction, typeReq } from '../config'

export const LIST_BANK = 'LIST_BANK'
export const CREATE_BANK = 'CREATE_BANK'
export const GET_BANK = 'GET_BANK'
export const ADD_BANK_ACCOUNT = 'ADD_BANK_ACCOUNT'

// function newBank ()
export const listBank = params => buildAction(typeReq(LIST_BANK), params)
export const getBank = params => buildAction(typeReq(GET_BANK), params)
export const addBankAccount = params => buildAction(typeReq(ADD_BANK_ACCOUNT), params)

