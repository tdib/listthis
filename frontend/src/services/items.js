import api from '.'

export const getItems = async () => {
  const { data } = await api.get('/list')
  return data.Items
}

// upsert
export const createItem = async ({ listID, item }) => {
  const { data } = await api.post(`/list/${listID}`, { item })
  return data
}

export const deleteItemFromDB = async ({ listID, itemID }) => {
  const { data } = await api.delete(`/list/${listID}/${itemID}`)
  return data
}

export const uploadImg = async ({ listID, itemID, img }) => {
  let formData = new FormData()
  formData.append('img', img)
  const { data } = await api.post(`/lists/images`, formData, 'multipart/form-data')
  return data
}
