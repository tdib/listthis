import create from 'zustand'

// Currently logged in user
const useUserStore = create(set => ({
  userID: null,
  username: null,
  associatedListIDs: null,

  loadUser: user => set({ ...user }),

  unloadUser: user =>
    set({
      userID: null,
      username: null,
      associatedListIDs: null,
    }),

  addAssociatedList: newList =>
    set(state => ({
      associatedListIDs: [...state.associatedListIDs, newList.listID],
    })),
}))

export default useUserStore
