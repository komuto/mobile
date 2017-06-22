import { authApi, authApiKomuto, publicApiKomuto } from './api'

function register (action) {
  let axios = publicApiKomuto()
  return axios.post('users', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function login (action) {
  let axios = publicApiKomuto()
  return axios.post('users/login', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function loginSocial (action) {
  let axios = publicApiKomuto()
  return axios.post('users/social-login', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function forgetPassword (action) {
  let axios = publicApiKomuto()
  return axios.post('passwords/forgot', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function newPassword (action) {
  let axios = authApi()
  return axios.put('users', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function getProfile (action) {
  let axios = authApiKomuto()
  return axios.get('users/profile', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

export {
  login,
  loginSocial,
  register,
  forgetPassword,
  newPassword,
  getProfile
}
