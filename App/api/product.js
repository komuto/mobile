import { publicApiKomuto, authApiKomuto } from './api'
import {AsyncStorage} from 'react-native'
import { buildQuery } from '../config'

function getProduct (action) {
  let token = AsyncStorage.getItem('token')
  let axios
  if (token) {
    axios = authApiKomuto()
  } else {
    axios = publicApiKomuto()
  }
  return axios.get('products/' + action.id, {
    ...action
  })
}

async function getProductBy (action) {
  const token = AsyncStorage.getItem('token')
  let axios = publicApiKomuto()
  if (token) axios = authApiKomuto()
  if (Array.isArray(action.price) && action.price.length > 0) {
    action.price = action.price.reduce((price, val, index) => {
      // minimum and maximum price can't be 0 to use the api
      // so set the default value if it is 0
      if (index === 0) price += val === 0 ? '50-' : `${val}-`
      else if (index === 1) price += val === 0 ? '1000000000000' : String(val)
      return price
    }, '')
  }
  const take = ['q', 'page', 'limit', 'sort', 'price', 'condition', 'other', 'brands', 'services', 'address', 'category_id']
  const query = buildQuery(action, take)
  return await axios.get(`products?${query}`)
    .catch((err) => { throw err })
}

function addToWishlist (action) {
  let axios = authApiKomuto()
  return axios.get('products/' + action.id + '/wishlist', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function addToWishlistHome (action) {
  let axios = authApiKomuto()
  return axios.get('products/' + action.id + '/wishlist', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

async function getDiscussion ({ id, page, limit }) {
  const axios = publicApiKomuto()
  const query = buildQuery({ page, limit })
  return await axios.get(`products/${id}/discussions?${query}`)
  .catch((err) => { throw err })
}

function newDiscussion (action) {
  let axios = authApiKomuto()
  return axios.post('products/' + action.id + '/discussions', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

async function getComment ({ productId, id, page, limit }) {
  const axios = publicApiKomuto()
  const query = buildQuery({ page, limit })
  return await axios.get(`products/${productId}/discussions/${id}/comments?${query}`)
    .catch((err) => { throw err })
}

function newComment (action) {
  let axios = authApiKomuto()
  return axios.post('products/' + action.productId + '/discussions/' + action.id + '/comments', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function reportProduct (action) {
  let axios = authApiKomuto()
  return axios.post('products/' + action.id + '/report', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

export const createProduct = async (action) => {
  const axios = authApiKomuto()
  return await axios.post('products', action).catch((err) => { throw err })
}

export const hideProducts = async ({ product_ids }) => {
  const axios = authApiKomuto()
  return await axios.post('users/store/products/hides', { product_ids }).catch((err) => { throw err })
}

export const deleteProducts = async ({ product_ids }) => {
  const axios = authApiKomuto()
  return await axios.post('users/store/products', { product_ids }).catch((err) => { throw err })
}

export const changeCatalogProducts = async (action) => {
  const axios = authApiKomuto()
  return await axios.post('users/store/products/move-catalog', action).catch((err) => { throw err })
}

export {
    getProduct,
    getProductBy,
    addToWishlist,
    addToWishlistHome,
    getDiscussion,
    newDiscussion,
    getComment,
    newComment,
    reportProduct
}
