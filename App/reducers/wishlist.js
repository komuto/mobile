import * as actions from '../actions/wishlist'
import { buildReducer, buildType, initState } from '../config'

const initWishlist = {
  wishlist: [],
  ...initState()
}

function wishlist (state = initWishlist, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_WISHLIST:
      return buildReducer(state, action, type, 'wishlist')
    default:
      return state
  }
}

export {
    wishlist
}
