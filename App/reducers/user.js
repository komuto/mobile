import * as actions from '../actions/user'

const initUser = {
  email: '',
  token: '',
  uid: '',
  user: {},
  status: 0
}

function auth (state = initUser, action) {
  // console.log(action)
  switch (action.type) {
    case actions.USER_REGISTER_REQUEST:
      return {
        ...state,
        email: action.email,
        token: '',
        uid: ''
      }
    case actions.USER_REGISTER_SUCCESS:
      return {
        ...state,
        email: action.user.email,
        token: action.token,
        uid: action.uid
      }
    case actions.USER_REGISTER_FAILURE:
      return {
        ...state,
        email: '',
        token: '',
        uid: ''
      }
    case actions.USER_LOGIN_REQUEST:
      return {
        ...state,
        email: action.email,
        token: '',
        uid: 0,
        user: {},
        status: 0
      }
    case actions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        email: action.data.email,
        token: action.data.token,
        uid: action.data.id,
        user: action.data,
        status: action.code
      }
    case actions.USER_LOGIN_FAILURE:
      return {
        ...state,
        email: '',
        token: '',
        uid: 0,
        user: {},
        status: action.code
      }
    default:
      return state
  }
}

export {
  auth
}
