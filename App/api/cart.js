import { authApiKomuto } from './api'

export const addToCart = async (action) => {
  const axios = authApiKomuto()
  return await axios.post('buckets', { ...action })
    .catch((err) => { throw (err) })
}
