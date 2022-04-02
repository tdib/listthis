import React from 'react'

import {
  PanelWrapper,
  Panel,
  PanelContent,
  CloseButton,
  XIcon,
  TitleField,
  NoteHeading,
  NoteSection,
  SaveButton,
} from './addItemPopupStyle'

const AddItemPopup = ({ isOpen, onClose }) => {
  return (
    <PanelWrapper dimBackground={isOpen}>
      <Panel isOpen={isOpen}>
        <PanelContent>
          <TitleField />
          <NoteHeading>Note</NoteHeading>
          <NoteSection />
          <SaveButton>Save</SaveButton>
        </PanelContent>
        <CloseButton onClick={onClose} doDisplay={isOpen}>
          <XIcon />
        </CloseButton>
      </Panel>
    </PanelWrapper>
  )
}

export default AddItemPopup
