import * as actions from '../actions/review'
import { buildReducer, buildType, initState } from '../config'

const initReview = {
  reviews: [],
  ...initState()
}

const initAdd = {
  ...initState()
}

function getReview (state = initReview, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_REVIEW:
      return buildReducer(state, action, type, 'reviews')
    default:
      return state
  }
}

function listReviewPagination (state = initReview, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.LIST_REVIEW:
      return buildReducer(state, action, type, 'reviews')
    default:
      return state
  }
}

function addReview (state = initAdd, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.ADD_REVIEW:
      return buildReducer(state, action, type)
    case actions.ADD_REVIEW_RESET:
      return initAdd
    default:
      return state
  }
}

export {
    getReview,
    listReviewPagination,
    addReview
}
