import * as actions from '../actions/user'

const initUser = {
  email: '',
  token: '',
  uid: '',
  user: {},
  message: '',
  status: '',
  isLoading: false,
  isOnline: true,
  isFound: false
}

const initProfile = {
  message: '',
  status: 0,
  verifyStatus: '',
  user: {},
  isLoading: false,
  isOnline: true,
  isFound: false
}

const initForgetPass = {
  email: '',
  message: '',
  status: '',
  isLoading: false,
  isOnline: true,
  isFound: false
}

const initVerify = {
  message: '',
  status: '',
  isLoading: false,
  isFound: false,
  isOnline: true
}

const initLogin = {
  login: false
}

function auth (state = initUser, action) {
  console.log(action.type)
  switch (action.type) {
    case actions.USER_LOGIN_REQUEST:
      return {
        ...state,
        email: action.email,
        token: '',
        uid: 0,
        user: {},
        message: action.message,
        status: action.code,
        isLoading: true
      }
    case actions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        email: action.data.email,
        token: action.data.token,
        uid: action.data.id,
        user: action,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true
      }
    case actions.USER_LOGIN_FAILURE:
      return {
        ...state,
        email: '',
        token: '',
        uid: 0,
        user: {},
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline,
        isFound: false
      }
    case actions.LOGIN_SOCIAL_REQUEST:
      return {
        ...state,
        email: action.email,
        token: '',
        uid: 0,
        user: {},
        message: action.message,
        status: action.code,
        isLoading: true
      }
    case actions.LOGIN_SOCIAL_SUCCESS:
      return {
        ...state,
        email: action.data.email,
        token: action.data.token,
        uid: action.data.id,
        user: action,
        message: action.message,
        status: action.code,
        is_required_password: action.data.is_required_password,
        isLoading: false,
        isFound: true
      }
    case actions.LOGIN_SOCIAL_FAILURE:
      return {
        ...state,
        email: '',
        token: '',
        uid: 0,
        user: {},
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline
      }
    case actions.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        message: 'User Logout Success',
        status: 0,
        isLoading: false,
        isFound: true
      }
    case actions.USER_NEWPASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.USER_NEWPASSWORD_SUCCESS:
      return {
        ...state,
        email: action.data.email,
        uid: action.data.id,
        user: action,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true
      }
    case actions.USER_NEWPASSWORD_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function verify (state = initVerify, action) {
  switch (action.type) {
    case actions.USER_VERIFICATION_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.USER_VERIFICATION_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true
      }
    case actions.USER_VERIFICATION_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function getProfile (state = initProfile, action) {
  switch (action.type) {
    case actions.GET_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.GET_PROFILE_SUCCESS:
      return {
        ...state,
        verifyStatus: action.data.user.status,
        user: action.data.user,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true
      }
    case actions.GET_PROFILE_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function register (state = initUser, action) {
  switch (action.type) {
    case actions.USER_REGISTER_REQUEST:
      return {
        ...state,
        email: action.email,
        token: '',
        uid: 0,
        user: {},
        message: '',
        status: 0,
        isLoading: false
      }
    case actions.USER_REGISTER_SUCCESS:
      return {
        ...state,
        email: action.data.email,
        uid: action.data.id,
        user: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true
      }
    case actions.USER_REGISTER_FAILURE:
      return {
        ...state,
        email: '',
        token: '',
        uid: 0,
        user: {},
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}
function forgetPassword (state = initForgetPass, action) {
  switch (action.type) {
    case actions.FORGET_PASSWORD_REQUEST:
      return {
        ...state,
        email: action.email,
        message: '',
        status: '',
        isLoading: true
      }
    case actions.FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true
      }
    case actions.FORGET_PASSWORD_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function isLogin (state = initLogin, action) {
  switch (action.type) {
    case actions.IS_LOGIN:
      return {
        ...state,
        login: action.login
      }
    default:
      return state
  }
}

export {
  auth,
  verify,
  getProfile,
  register,
  forgetPassword,
  isLogin
}
