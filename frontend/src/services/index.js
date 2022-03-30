import axios from 'axios'

export const instance = axios.create({
  // baseURL: config.apiAddress,
  baseURL: 'http://localhost:5000/',
  timeout: 1000 * 10,
  headers: {
    'Content-Type': 'application/json',
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

export default api
