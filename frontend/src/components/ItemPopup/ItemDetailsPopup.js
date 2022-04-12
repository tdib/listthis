import React from 'react'

import { DetailsContainer, Heading, SubText, NoteHeading, NoteSection, DeleteButton } from './itemDetailsStyle'
import { CloseButton, Panel, PanelWrapper, XIcon } from './itemPopupStyle'
import dayjs from 'dayjs'
// import { deleteItem } from '../../services/items'
import useListStore from '../../stores/useListStore'
import { deleteItemFromDB } from '../../services/items'

// const handleDelete = id => {
//   if (window.confirm('Are you sure you would like to delete this item?')) {
//     deleteItem(id)
//     // deleteItem(id)
//   }
// }

const ItemDetailsPopup = ({ item, isOpen, onClose }) => {
  const deleteItem = useListStore(s => s.deleteItem)
  const { id, name, authorID, dateAdded, note, imageURL } = item
  const listID = useListStore(s => s.id)
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
              if (window.confirm('Are you sure you would like to delete this item?')) {
                deleteItem(id)
                deleteItemFromDB({ listID, itemID: id })
                onClose()
              }
              // handleDelete(id)
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
