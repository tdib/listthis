import create from 'zustand'
import { persist } from 'zustand/middleware'

const useListsStore = create(
  persist(
    (set, get) => ({
      lists: null,
      currListUID: null,

      setCurrListUID: listUID => set({ currListUID: listUID }),
      getCurrList: () => get().lists.find(list => list.listUID === get().currListUID),

      loadLists: lists => set({ lists: lists }),
      unloadLists: () => set({ lists: null, currListUID: null }),

      leaveList: listToRemoveID =>
        set(state => ({
          lists: state.lists.filter(list => list.listUID !== listToRemoveID),
        })),

      createList: list =>
        set(state => ({
          lists: [...state.lists, list],
        })),

      upsertList: newList => 
        set(state => ({
          lists: state.lists.find(list => list.listUID === newList.listUID)
          ? state.lists.map(list => list.listUID === newList.listUID ? newList : list)
          : [...state.lists, newList]
        })),


      // add item
      // remove item
      // check item
    }),
    { name: 'listsCache' }
  )
)

export default useListsStore