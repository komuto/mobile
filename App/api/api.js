import axios from 'axios'
import { serviceUrl } from '../Config/config'
import {token} from '../Config/store'

export function authApi () {
  return axios.create({
    baseURL: serviceUrl + '/',
    headers: {'Authorization': token()}
  })
}

export function publicApi () {
  return axios.create({
    baseURL: serviceUrl + '/'
  })
}
