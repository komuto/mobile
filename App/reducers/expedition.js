import * as actions from '../actions/expedition'
import { buildReducer, buildType, initState } from '../config'

const initExpedition = {
  expeditions: [],
  ...initState()
}

const initCharge = {
  charges: [],
  ...initState()
}

const initUpdate = {
  ...initState()
}

function expedition (state = initExpedition, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_EXPEDITION:
      return buildReducer(state, action, type, 'expeditions')
    default:
      return state
  }
}

function expeditionServices (state = initExpedition, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_EXPEDITION:
      return buildReducer(state, action, type, 'expeditions')
    default:
      return state
  }
}

function estimatedShipping (state = initCharge, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.ESTIMATED_SHIPPING:
      return buildReducer(state, action, type, 'charges')
    default:
      return state
  }
}

function shippingCharge (state = initCharge, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_SHIPPING_CHARGE:
      return buildReducer(state, action, type, 'charges')
    default:
      return state
  }
}

function updateExpediton (state = initUpdate, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.UPDATE_EXPEDITION:
      return buildReducer(state, action, type)
    default:
      return state
  }
}

export {
  expedition,
  expeditionServices,
  estimatedShipping,
  shippingCharge,
  updateExpediton
}
