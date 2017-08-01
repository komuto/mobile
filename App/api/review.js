import { authApiKomuto, publicApiKomuto } from './api'
import { buildQuery } from '../config'

async function getReviews ({ id, page, limit }) {
  const axios = publicApiKomuto()
  const query = buildQuery({ page, limit })
  return await axios.get(`products/${id}/reviews?${query}`)
    .catch((err) => { throw err })
}

function addReview (action) {
  let axios = authApiKomuto()
  return axios.post('products/' + action.id + '/reviews', {
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
  getReviews,
  addReview
}
