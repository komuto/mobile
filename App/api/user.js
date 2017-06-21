import { authApi, publicApi, publicApiKomuto } from './api'

function register (action) {
  let axios = publicApiKomuto()
  return axios.post('users', {
    ...action
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
  // axios.interceptors.response.use(function (res) {
  //   if (res.response !== undefined) {
  //     return res
  //   } else {
  //     console.log('Network Error')
  //   }
  // })
  // return response
}

// function getProfile (action) {
//   let axios = authApiKomuto()
//   return axios.get('users/' + action.id, {
//     ...action
//   })
// }

function loginSocial (action) {
  let axios = publicApiKomuto()
  return axios.post('users/social-login', {
    ...action
  })
}

function forgetPassword (action) {
  let axios = publicApi()
  return axios.post('passwords/forgot', {
    ...action
  })
}

function newPassword (action) {
  let axios = authApi()
  return axios.put('users', {
    ...action
  })
}

export {
  login,
  loginSocial,
  register,
  forgetPassword,
  newPassword
}
