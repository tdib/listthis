import create from 'zustand'

// Currently logged in user
const useUserStore = create(set => ({
  userID: null,
  username: null,
  associatedListIDs: null,
  firstName: null,
  lastName: null,

  loadUser: user => set({ ...user }),
}))

export default useUserStore

// const items = useListStore(s => s.items)
// useEffect(() => {
//   debounce(setItemsinDB(), 5000)
// }, [items])
