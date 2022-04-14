import api from '.'

export const createNewList = async ({ listID, listName, userID }) => {
  const { data } = await api.post(`/list`, { listID, listName, userID })
  return data
}

export const getListsByUserID = async userID => {
  const { data } = await api.get(`lists/${userID}`)
  return data
}

export const getListByID = async id => {
  const { data } = await api.get(`list/${id}`)
  return data
}

// id & name
export const updateList = async ({ listID, items }) => {
  const { data } = await api.put(`/list/${listID}`, { listItems: items })
  return data
}

export const removeUserFromList = async ({ userID, listID }) => {
  const { data } = await api.delete(`/users/${userID}/${listID}`)
  return data
}