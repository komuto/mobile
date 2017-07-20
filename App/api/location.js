import { publicApiKomuto } from './api'

function getProvince (action) {
  let axios = publicApiKomuto()
  return axios.get('locations/provinces', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function getDistrict (action) {
  let axios = publicApiKomuto()
  let params
  if (action.id === undefined) {
    params = ''
  } else {
    params = '?province_id=' + action.id
  }
  return axios.get('locations/districts' + params, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function getSubDistrict (action) {
  let axios = publicApiKomuto()
  let params
  if (action.id === undefined) {
    params = ''
  } else {
    params = '?district_id=' + action.id
  }
  return axios.get('locations/sub-districts' + params, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function getVillage (action) {
  let axios = publicApiKomuto()
  let params
  if (action.id === undefined) {
    params = ''
  } else {
    params = '?sub_district_id=' + action.id
  }
  return axios.get('locations/villages' + params, {
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
  getProvince,
  getDistrict,
  getSubDistrict,
  getVillage
}
