import React, { useState } from 'react'
import AddButton from '../AddButton/AddButton'
import { TabBarContainer } from './tabBarStyle'
import AddItemPopup from '../ItemPopup/AddItemPopup.js'
import useListStore from '../../stores/useListStore'

const TabBar = () => {
  const [addItemMenuOpen, setAddItemMenuOpen] = useState(false)

  return (
    <>
      <TabBarContainer>
        <AddButton onClick={() => setAddItemMenuOpen(true)} />
      </TabBarContainer>
      <AddItemPopup isOpen={addItemMenuOpen} onClose={() => setAddItemMenuOpen(false)} />
    </>
  )
}

export default TabBar
