import React, { useState } from 'react'
import AddButton from '../AddButton/AddButton'
import { TabBarContainer } from './tabBarStyle'
import AddItemPopup from '../ItemPopup/AddItemPopup.js'
import useListStore from '../../stores/useListStore'
import CreateListPopup from '../ItemPopup/CreateListPopup'

const TabBar = () => {
  const [addItemMenuOpen, setAddItemMenuOpen] = useState(false)
  const items = useListStore(s => s.items)

  return (
    <>
      <TabBarContainer>
        <AddButton onClick={() => setAddItemMenuOpen(true)} />
      </TabBarContainer>
      {items ? (
        <AddItemPopup isOpen={addItemMenuOpen} onClose={() => setAddItemMenuOpen(false)} />
      ) : (
        <CreateListPopup isOpen={addItemMenuOpen} onClose={() => setAddItemMenuOpen(false)} />
      )}
    </>
  )
}

export default TabBar
