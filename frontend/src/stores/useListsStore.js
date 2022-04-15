import debounce from 'lodash.debounce'
import { useEffect } from 'react'
import create from 'zustand'

// current list (id, name, list items)
const useListsStore = create(set => ({
  lists: null,

  loadLists: lists => set({ lists: lists }),

  leaveList: listToRemoveID => set(state => ({
    lists: state.lists.filter(list => list.listID !== listToRemoveID)
  })),

  createList: list =>
    set(state => ({
      lists: [...state.lists, list],
    })),
}))

export default useListsStore
