import React from 'react'
import AddButton from '../AddButton/AddButton'
import { TabBarContainer } from './tabBarStyle'

const TabBar = ({ onOpenAddItemMenu }) => {
  return (
    <TabBarContainer>
      <AddButton onClick={onOpenAddItemMenu} />
    </TabBarContainer>
  )
}

export default TabBar
