import debounce from 'lodash.debounce'
import { useEffect } from 'react'
import create from 'zustand'

// current list (id, name, list items)
const useListsStore = create(set => ({
  lists: null,

  loadLists: lists => set({ lists: lists }),

  leaveList: listToRemove => set(state => ({
    lists: state.lists.filter(list => list.id !== listToRemove)
  })),
  // addList
  // leaveList
  createList: list =>
    set(state => ({
      lists: [...state.lists, list],
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

export default useListsStore

// const items = useListStore(s => s.items)
// useEffect(() => {
//   debounce(setItemsinDB(), 5000)
// }, [items])
