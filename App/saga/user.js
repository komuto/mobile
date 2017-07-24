import { put } from 'redux-saga/effects'
import * as userActions from '../actions/user'
import * as userApi from '../api/user'
import {AsyncStorage} from 'react-native'
import { errorHandling, typeSucc, typeFail } from '../config'

function * register (action) {
  try {
    const {data} = yield userApi.register(action)
    yield AsyncStorage.setItem('token', data.data.token)
    yield put({ type: typeSucc(userActions.USER_REGISTER), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.USER_REGISTER), e)
  }
}

function * login (action) {
  try {
    const {data} = yield userApi.login(action)
    yield AsyncStorage.setItem('token', data.data.token)
    yield put({ type: typeSucc(userActions.USER_LOGIN), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.USER_LOGIN), e)
  }
}

function* validateToken (action) {
  try {
    const {data} = yield userApi.validateToken(action)
    yield put({ type: typeSucc(userActions.VALIDATE_TOKEN_FORGET_PASSWORD), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.VALIDATE_TOKEN_FORGET_PASSWORD), e)
  }
}

function* logout (action) {
  try {
    const data = yield userApi.logout(action)
    yield AsyncStorage.removeItem('token')
    yield put({ type: typeSucc(userActions.USER_LOGOUT), ...data })
  } catch (e) {
    const data = {
      message: 'USER LOGOUT FAILED',
      code: 400
    }
    yield put({ type: typeFail(userActions.USER_LOGOUT), ...data })
  }
}

function* verify (action) {
  try {
    const {data} = yield userApi.verification(action)
    yield put({ type: typeSucc(userActions.USER_VERIFICATION), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.USER_VERIFICATION), e)
  }
}

function * forgetPassword (action) {
  try {
    const {data} = yield userApi.forgetPassword(action)
    yield put({ type: typeSucc(userActions.FORGET_PASSWORD), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.FORGET_PASSWORD), e)
  }
}

function * loginSocial (action) {
  try {
    const {data} = yield userApi.loginSocial(action)
    yield AsyncStorage.setItem('token', data.data.token)
    yield put({ type: typeSucc(userActions.LOGIN_SOCIAL), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.LOGIN_SOCIAL), e)
  }
}

function * newPassword (action) {
  try {
    const {data} = yield userApi.newPassword(action)
    yield put({ type: typeSucc(userActions.USER_NEW_PASSWORD), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.USER_NEW_PASSWORD), e)
  }
}

function * changePassword (action) {
  try {
    const {data} = yield userApi.changePassword(action)
    yield put({ type: typeSucc(userActions.CHANGE_PASSWORD), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.CHANGE_PASSWORD), e)
  }
}

function* getProfile (action) {
  try {
    const {data} = yield userApi.getProfile(action)
    yield put({ type: typeSucc(userActions.GET_PROFILE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.GET_PROFILE), e)
  }
}

function* getProfileManage (action) {
  try {
    const {data} = yield userApi.getProfileManage(action)
    yield put({ type: typeSucc(userActions.GET_PROFILE_MANAGE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.GET_PROFILE_MANAGE), e)
  }
}

function* getPhone (action) {
  try {
    const {data} = yield userApi.getPhone(action)
    yield put({ type: typeSucc(userActions.GET_PHONE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.GET_PHONE), e)
  }
}

function* updatePhone (action) {
  try {
    const {data} = yield userApi.updatePhone(action)
    yield put({ type: typeSucc(userActions.UPDATE_PHONE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.UPDATE_PHONE), e)
  }
}

function * updateProfile (action) {
  try {
    const {data} = yield userApi.updateProfile(action)
    yield put({ type: typeSucc(userActions.UPDATE_PROFILE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.UPDATE_PROFILE), e)
  }
}

function * getBalance (action) {
  try {
    const {data} = yield userApi.getBalance(action)
    yield put({ type: typeSucc(userActions.USER_BALANCE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.USER_BALANCE), e)
  }
}

function * favoriteStore (action) {
  try {
    const {data} = yield userApi.favoriteStore(action)
    yield put({ type: typeSucc(userActions.FAVORITE_STORE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.FAVORITE_STORE), e)
  }
}

function * addToBucket (action) {
  try {
    const {data} = yield userApi.addToBucket(action)
    yield put({ type: typeSucc(userActions.ADD_TO_BUCKET), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.ADD_TO_BUCKET), e)
  }
}

function * countBucket (action) {
  try {
    const {data} = yield userApi.countBucket(action)
    yield put({ type: typeSucc(userActions.COUNT_BUCKET), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.COUNT_BUCKET), e)
  }
}

function * getBucket (action) {
  try {
    const {data} = yield userApi.getBucket(action)
    yield put({ type: typeSucc(userActions.GET_BUCKET), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.GET_BUCKET), e)
  }
}

function * getDiscussion (action) {
  try {
    const {data} = yield userApi.getDiscussion(action)
    yield put({ type: typeSucc(userActions.GET_USER_DISCUSSION), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.GET_USER_DISCUSSION), e)
  }
}

function * listFavoriteStore (action) {
  try {
    const {data} = yield userApi.listFavoriteStore(action)
    yield put({ type: typeSucc(userActions.LIST_FAVORIT_STORE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.LIST_FAVORIT_STORE), e)
  }
}

function * sendOTPPhone (action) {
  try {
    const {data} = yield userApi.sendOTPPhone(action)
    yield put({ type: typeSucc(userActions.SEND_PHONE_OTP), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.SEND_PHONE_OTP), e)
  }
}

function * verifyPhone (action) {
  try {
    const {data} = yield userApi.verifyPhone(action)
    yield put({ type: typeSucc(userActions.VERIFIY_PHONE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.VERIFIY_PHONE), e)
  }
}

export const sendOTPBank = function* () {
  try {
    const { data } = yield userApi.sendOTPBank()
    yield put({ type: typeSucc(userActions.SEND_BANK_OTP), ...data })
  } catch (e) {
    yield errorHandling(typeFail(userActions.SEND_BANK_OTP), e)
  }
}

export {
  login,
  logout,
  register,
  verify,
  validateToken,
  forgetPassword,
  loginSocial,
  newPassword,
  changePassword,
  getProfile,
  getProfileManage,
  getBalance,
  getPhone,
  updatePhone,
  updateProfile,
  favoriteStore,
  addToBucket,
  countBucket,
  getBucket,
  getDiscussion,
  listFavoriteStore,
  verifyPhone,
  sendOTPPhone
}
