import api from '.'

export const getItems = async () => {
  // return [
  //   { id: 0, name: 'iPhone 13', note: '', isSelected: true },
  //   { id: 1, name: 'iPhone 12', note: 'I want this iPhone too!', isSelected: false },
  //   { id: 2, name: 'Lettuce', note: 'Cosine lettuce please', isSelected: false },
  //   { id: 3, name: 'Lettuce', note: 'Cosine lettuce please', isSelected: false },
  // ]
  const { data } = await api.get('/list')
  console.log(data.Items)
  return data.Items
}

export const setItems = async () => {
  return undefined
}
