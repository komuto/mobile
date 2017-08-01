import { publicApiKomuto } from './api'
import { buildQuery } from '../config'

async function getProvince (action) {
  const axios = publicApiKomuto()
  return await axios.get('locations/provinces').catch((err) => { throw err })
}

async function getDistrict (action) {
  const axios = publicApiKomuto()
  const query = buildQuery(action)
  return await axios.get(`locations/districts?${query}`).catch((err) => { throw err })
}

async function getSubDistrict (action) {
  const axios = publicApiKomuto()
  const query = buildQuery(action)
  return await axios.get(`locations/sub-districts?${query}`).catch((err) => { throw err })
}

async function getVillage (action) {
  const axios = publicApiKomuto()
  const query = buildQuery(action)
  return await axios.get(`locations/villages?${query}`).catch((err) => { throw err })
}

export {
  getProvince,
  getDistrict,
  getSubDistrict,
  getVillage
}
