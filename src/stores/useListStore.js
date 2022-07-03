import create from 'zustand'

// current list (id, name, list items)
const useListStore = create(set => ({
  listID: null,
  name: null,
  items: null,

  loadList: list => set({ ...list }),

  unloadList: () =>
    set({
      listID: null,
      name: null,
      items: null,
    }),

  addItem: item =>
    set(state => ({
      items: [...state.items, item],
    })),

  deleteItem: itemToDeleteID =>
    set(state => ({
      items: state.items.filter(item => item.itemID !== itemToDeleteID),
    })),

  toggleItem: itemToToggleID =>
    set(state => ({
      items: state.items.map(item => (item.itemID === itemToToggleID ? { ...item, isChecked: !item.isChecked } : item)),
    })),
}))

export default useListStore
