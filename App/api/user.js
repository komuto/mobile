import { authApi } from './api'

function login (action) {
  let axios = authApi()
  return axios.post('users/login', {
    ...action
  })
}

export {
  login
}
