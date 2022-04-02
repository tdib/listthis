import React from 'react'
import AddItemPopup from '../AddItemPopup/AddItemPopup'

import { AddButtonContainer, PlusIcon } from './addButtonStyle'

const AddButton = ({ onClick }) => {
  return (
    <AddButtonContainer onClick={onClick}>
      <PlusIcon />
    </AddButtonContainer>
  )
}

export default AddButton
