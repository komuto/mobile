import { put } from 'redux-saga/effects'

export const serviceUrl = 'https://private-f0902d-komuto.apiary-mock.com'
export const apiKomuto = 'https://api.komuto.skyshi.com'

export function errorHandling (actionType, res) {
  const errorOffline = {
    message: 'Your device is offline',
    code: 'ENOENT',
    isOnline: false
  }

  const data = res.response
  if (data !== undefined) {
    if (data.status !== 502) {
      const {data} = res.response
      data.isOnline = true
      return put({ type: actionType, ...data })
    } else {
      let errorBadGateway = {
        message: res.response.statusText,
        code: res.response.status,
        isOnline: true
      }
      return put({ type: actionType, ...errorBadGateway })
    }
  } else {
    return put({ type: actionType, ...errorOffline })
  }
}

/**
 * Build initial state
 */
export const initState = () => {
  return {
    message: '',
    state: 0,
    isLoading: false,
    isFound: false,
    isOnline: true
  }
}

/**
 * Build request state
 * @param state {object} current state
 */
export const reqState = (state) => {
  return {
    ...state,
    isLoading: true
  }
}

/**
 * Build success state
 * @param action {object}
 * @param data {string} Prop name
 */
export const succState = (action, data = false) => {
  const state = {
    message: action.message,
    state: action.code,
    isLoading: false,
    isFound: true,
    isOnline: true
  }
  if (data) state[data] = action.data
  return state
}

/**
 * Build failure state
 * @param action {object}
 * @param data {string} Prop name
 * @param value {*} value for the prop
 */
export const failState = (action, data = false, value = false) => {
  const state = {
    message: action.message,
    state: action.code,
    isLoading: false,
    isFound: false,
    isOnline: action.isOnline
  }
  if (data) state[data] = value || ''
  return state
}

export const buildAction = (type, params = false) => {
  if (params) {
    return {
      type,
      ...params
    }
  }
  return { type }
}

export const typeReq = type => `${type}_REQUEST`
export const typeSucc = type => `${type}_SUCCESS`
export const typeFail = type => `${type}_FAILURE`
