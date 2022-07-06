import create from 'zustand'

const useListsStore = create(set => ({
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
}))

export default useListsStore