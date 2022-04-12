import api from '.'

export const getItems = async () => {
  const { data } = await api.get('/list')
  return data.Items
}

// upsert
export const createItem = async ({ listID, item }) => {
  const { data } = await api.post(`/list/${listID}`, { listID, item })
  return data
}

export const deleteItemFromDB = async ({ listID, itemID }) => {
  console.log('item', itemID)
  const { data } = await api.delete(`/list/${listID}/${itemID}`)
  console.log(data)
  return data
}

export const setItems = async () => {
  return undefined
}
