import create from 'zustand'
import { persist } from 'zustand/middleware'

const useListsStore = create(
  persist(
    set => ({
      lists: null,

      loadLists: lists => set({ lists: lists }),

      unloadLists: () => set({ lists: null }),

      leaveList: listToRemoveID =>
        set(state => ({
          lists: state.lists.filter(list => list.listUID !== listToRemoveID),
        })),

      createList: list =>
        set(state => ({
          lists: [...state.lists, list],
        })),

      // TODO: update list
      upsertList: newList => {
        set(state => ({
          lists: state.lists.find(list => list.listUID === newList.listUID)
          ? state.lists.map(list => list.listUID === newList.listUID ? newList : list)
          : [...state.lists, newList]
          // lists: state.lists.map(list => list.listUID === newList.listUID ? newList : list)
        }))
      }
    }),
    { name: 'listsCache' }
  )
)

export default useListsStore