import React from 'react'

import { DetailsContainer, Heading, SubText, NoteHeading, NoteSection, DeleteButton } from './itemDetailsStyle'
import { CloseButton, Panel, PanelWrapper, XIcon } from './itemPopupStyle'
import dayjs from 'dayjs'
import { deleteItem } from '../../services/items'

const handleDelete = id => {
  if (window.confirm('Are you sure you would like to delete this item?')) {
    deleteItem(id)
  }
}

const ItemDetailsPopup = ({ item, isOpen, onClose }) => {
  const { id, name, authorID, dateAdded, note, imageURL } = item
  // console.log(item)
  return (
    <PanelWrapper dimBackground={isOpen}>
      <Panel isOpen={isOpen}>
        <DetailsContainer>
          <Heading>{name}</Heading>
          <SubText>{`Item listed by ${authorID || 'UNKNOWN USER'} on ${dayjs(dateAdded).format(
            ' dddd, Do MMMM'
          )}`}</SubText>
          <NoteHeading>Note</NoteHeading>
          <NoteSection>{note || 'There is no note for this item.'}</NoteSection>
          <DeleteButton
            onClick={() => {
              handleDelete(id)
              onClose()
            }}
          >
            Delete
          </DeleteButton>
        </DetailsContainer>
        <CloseButton onClick={onClose} doDisplay={isOpen}>
          <XIcon />
        </CloseButton>
      </Panel>
    </PanelWrapper>
  )
}

export default ItemDetailsPopup
