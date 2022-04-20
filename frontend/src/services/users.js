import api from '.'

export const signup = async ({ userID, username, password }) => {
  const { data } = await api.post(`/auth/signup`, { userID, username, password })
  return data
}

export const login = async ({ username, password }) => {
  const { data } = await api.post(`/auth/login`, { username, password })
  if (data.isAuthenticated) {
    localStorage.setItem('access-token', data.accessToken)
  }
  return data
}

export const getUserByID = async userID => {
  const { data } = await api.get(`/user/${userID}`)
  return data
}
