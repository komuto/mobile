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
    status: 0,
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
    status: 0,
    isLoading: true
  }
}

/**
 * Build success state
 * @param action {object}
 * @param data {string} Prop name
 */
export const succState = (action, data) => {
  const state = {
    message: action.message,
    status: action.code,
    isLoading: false,
    isFound: true,
    isOnline: true
  }
  if (data) state[data] = action.data
  return state
}

/**
 * Build success state by keeping previous data
 * @param action {object}
 * @param data {string} Prop name
 * @param value {array} previous data
 */
export const succKeepState = (action, data, value) => {
  return {
    ...succState(action),
    [data]: [action.data, ...value]
  }
}

/**
 * Build failure state
 * @param action {object}
 * @param data {string} Prop name
 * @param value {*} value for the prop
 */
export const failState = (action, data, value = false) => {
  const state = {
    message: action.message,
    status: action.code,
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

/**
 * Build reducer
 * @param state {object}
 * @param action {object}
 * @param type {string}
 * @param name {string} additional field name
 * @param keep {bool} Keep previous state
 */
export const buildReducer = (state, action, type, name, keep = false) => {
  switch (action.type) {
    case typeReq(type):
      return reqState(state)
    case typeSucc(type):
      return !keep ? succState(action, name) : succKeepState(action, name, state[name])
    case typeFail(type):
      return failState(action, name, state[name])
    default:
      return state
  }
}

/**
 * Remove [REQUEST, SUCCESS, FAILURE] from action type
 * @param type {string}
 */
export const buildType = (type) => {
  const toBeRemoved = ['REQUEST', 'SUCCESS', 'FAILURE']
  type = type.split('_')
  if (!toBeRemoved.includes(type[type.length - 1])) return type.join('_')
  type.splice(type.length - 1, 1)
  return type.join('_')
}

export const typeReq = type => `${type}_REQUEST`
export const typeSucc = type => `${type}_SUCCESS`
export const typeFail = type => `${type}_FAILURE`
