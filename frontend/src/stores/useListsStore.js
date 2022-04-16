import create from 'zustand'

const useListsStore = create(set => ({
  lists: null,

  loadLists: lists => set({ lists: lists }),

  leaveList: listToRemoveID =>
    set(state => ({
      lists: state.lists.filter(list => list.listID !== listToRemoveID),
    })),

  createList: list =>
    set(state => ({
      lists: [...state.lists, list],
    })),
}))

export default useListsStore
