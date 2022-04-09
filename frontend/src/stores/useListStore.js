import debounce from 'lodash.debounce'
import { useEffect } from 'react'
import create from 'zustand'

// current list (id, name, list items)
const useListStore = create(set => ({
  id: null,
  name: null,
  items: null,
  loadList: list => set({ ...list }),
  addItem: item =>
    set(state => ({
      items: [...state.items, item],
    })),
  deleteItem: id =>
    set(state => ({
      items: state.items.filter(item => item.id !== id),
    })),
  toggleItem: id =>
    set(state => ({
      items: state.items.map(item => (item.id === id ? { ...item, isChecked: !item.isChecked } : item)),
    })),
}))

export default useListStore

// const items = useListStore(s => s.items)
// useEffect(() => {
//   debounce(setItemsinDB(), 5000)
// }, [items])
