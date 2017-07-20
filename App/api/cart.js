import { authApiKomuto } from './api'

export const addToCart = (action) => {
  let axios = authApiKomuto()
  return axios.post('buckets', {
    ...action
  })
    .then(data => data)
    .catch((err) => { throw (err) })
}
