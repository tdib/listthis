import api from '.'

export const createNewList = async ({ listID, listName, userID }) => {
  console.log('HI', listID, listName, userID)
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
export const updateList = async ({ id, name, items }) => {
  console.log('1')
  const { data } = await api.post(`/list/${id}`, { items })
  console.log('HELKFHSKLEFH')
  return data
}
