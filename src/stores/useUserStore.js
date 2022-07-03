import create from 'zustand'
import { persist } from 'zustand/middleware'

// Currently logged in user
const useUserStore = create(
  persist(
    set => ({
      userID: null,
      email: null,
      displayName: null,
      associatedListIDs: null,

      loadUser: user => set({ ...user }),

      unloadUser: () =>
        set({
          userID: null,
          email: null,
          displayName: null,
          associatedListIDs: null,
        }),

      addAssociatedList: newList =>
        set(state => ({
          associatedListIDs: [...state.associatedListIDs, newList.listID],
        })),
    }),
    { name: 'userCache' }
  )
)

export default useUserStore
