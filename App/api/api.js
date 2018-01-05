import apisauce from 'apisauce'
import { serviceUrl, apiKomuto, storage } from '../config'
import {token} from '../store'

export function authApi () {
  return apisauce.create({
    baseURL: serviceUrl + '/',
    headers: {'Authorization': token()}
  })
}

export function publicApi () {
  return apisauce.create({
    baseURL: serviceUrl + '/'
  })
}

export function publicApiKomuto () {
  return apisauce.create({
    baseURL: apiKomuto + '/',
    timeout: 10000
  })
}

export function uploadApi () {
  const api = apisauce.create({
    baseURL: apiKomuto + '/',
    headers: {
      'Accept': 'application/json',
      'enctype': 'multipart/form-data'
    }
  })
  api.addAsyncRequestTransform(config => async () => {
    const token = await storage.getItem('token')
    if (token !== null) {
      config.headers['Authorization'] = 'JWT ' + token
    }
    return config
  })
  return api
}

<<<<<<< HEAD
export function authApiKomuto (custToken) {
  const api = axios.create({
=======
export function authApiKomuto (custToken, timeout = 10000) {
  const api = apisauce.create({
>>>>>>> beny
    baseURL: apiKomuto + '/',
    headers: { 'Content-Type': 'application/json' },
    timeout
  })
<<<<<<< HEAD
  api.interceptors.request.use(async config => {
    try {
      const token = !custToken ? await storage.getItem('token') : custToken
      if (token !== null) {
        config.headers['Authorization'] = 'JWT ' + token
      }
      return config
    } catch (err) {
      config.log('Error with message: ', err)
=======
  api.addAsyncRequestTransform(config => async () => {
    const token = !custToken ? await storage.getItem('token') : custToken
    if (token !== null) {
      config.headers['Authorization'] = 'JWT ' + token
>>>>>>> beny
    }
    return config
  })
  return api
}
