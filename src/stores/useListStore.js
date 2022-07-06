import create from 'zustand'

// current list (id, name, list items)
const useListStore = create(set => ({
  listUID: null,
  associatedUUIDs: null,
  name: null,
  items: null,


  loadList: list => set({ ...list }),

  unloadList: () =>
    set({
      listUID: null,
      associatedUUIDs: null,
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

  toggleItem: itemToToggleUID =>
    set(state => ({
      items: state.items.map(item => (item.itemUID === itemToToggleUID ? { ...item, isChecked: !item.isChecked } : item)),
    })),

}))

export default useListStore
