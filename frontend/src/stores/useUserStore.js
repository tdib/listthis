import create from 'zustand'

// Currently logged in user
const useUserStore = create(set => ({
  userID: null,
  username: null,
  associatedListIDs: null,
  firstName: null,
  lastName: null,
  isLoggedIn: null,

  loadUser: user => set({ ...user }),

  unloadUser: set({
    userID: null,
    username: null,
    associatedListIDs: null,
    firstName: null,
    lastName: null,
    isLoggedIn: null,
  }),
}))

export default useUserStore
