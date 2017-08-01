import { authApiKomuto } from './api'

export const addToCart = async (action) => {
  const axios = authApiKomuto()
  return await axios.post('buckets', action).catch((err) => { throw (err) })
}

export const getCart = async () => {
  const axios = authApiKomuto()
  return await axios.get('users/bucket').catch((err) => { throw err })
}

export const countCart = async () => {
  const axios = authApiKomuto()
  return await axios.get('buckets/count').catch((err) => { throw err })
}

export const getPromo = async ({ code }) => {
  const axios = authApiKomuto()
  return await axios.get(`buckets/promo?code=${code}`).catch((err) => { throw err })
}

export const cancelPromo = async () => {
  const axios = authApiKomuto()
  return await axios.get('buckets/promo/cancel').catch((err) => { throw err })
}
