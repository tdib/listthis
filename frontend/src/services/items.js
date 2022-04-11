import api from '.'

export const createNewList = async ({ id, name }) => {
  const { data } = await api.post(`/list`, { id, name })
  console.log(data)
  console.log('object')
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

export const getItems = async () => {
  const { data } = await api.get('/list')
  return data.Items
}

// upsert
export const createOrUpdateItem = async ({ listID, itemFields }) => {
  console.log('LIST ID IS ' + listID)
  const { data } = await api.post(`/list/${listID}`, itemFields)
  return data
}

export const deleteItem = async id => {
  const { data } = await api.delete(`/list/${id}`)
  console.log(data)
  return data
}

export const setItems = async () => {
  return undefined
}

// id & name
export const updateList = async ({ id, name, items }) => {
  console.log('1')
  const { data } = await api.post(`/list/${id}`, { items })
  console.log('HELKFHSKLEFH')
  return data
}
