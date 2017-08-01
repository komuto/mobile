import { publicApiKomuto } from './api'

function search (action) {
  let axios = publicApiKomuto()
  return axios.get('products/search?q=' + action.query, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function allCategory (action) {
  let axios = publicApiKomuto()
  return axios.get('categories/sub', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function categoryList (action) {
  let axios = publicApiKomuto()
  return axios.get('categories', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function subCategory (action) {
  let axios = publicApiKomuto()
  return axios.get('categories/' + action.id, {
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
  search,
  allCategory,
  categoryList,
  subCategory
}
