import axios from 'axios'
import config from '../config'

export const instance = axios.create({
  baseURL: config.API_URL,
  timeout: 1000 * 10,
  headers: {
    'Content-Type': 'application/json',
    'access-token': localStorage.getItem('access-token'),
  },
})

const api = {
  get: (endpoint, data) => instance.get(endpoint, { params: data }),

  post: (endpoint, data, type = 'application/json') =>
    instance.post(endpoint, data, {
      headers: {
        'Content-Type': type,
      },
    }),

  patch: (endpoint, data, type = 'application/json') =>
    instance.patch(endpoint, data, {
      headers: {
        'Content-Type': type,
      },
    }),

  put: instance.put,
  delete: instance.delete,
}

// export * from './items'
// export * from './lists'

export default api
