import api from '.'

export const getItems = async () => {
  const { data } = await api.get('/list')
  return data.Items
}

// upsert
export const createOrUpdateItem = async ({ listID, item }) => {
  const { data } = await api.post(`/list/${listID}`, { listID, item })
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
