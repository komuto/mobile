import { authApiKomuto } from './api'

export const addToCart = async (action) => {
  const axios = authApiKomuto()
  return await axios.post('buckets', { ...action })
    .catch((err) => { throw (err) })
}

export const getPromo = async ({ code }) => {
  const axios = authApiKomuto()
  return await axios.get(`buckets/promo?code=${code}`)
    .catch((err) => { throw err })
}
