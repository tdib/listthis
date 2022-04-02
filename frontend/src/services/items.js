import api from '.'

export const getItems = async () => {
  const { data } = await api.get('/list')
  return data.Items
}

export const createItem = async itemFields => {
  const { data } = await api.post('/list', itemFields)
  return data
}

export const setItems = async () => {
  return undefined
}
