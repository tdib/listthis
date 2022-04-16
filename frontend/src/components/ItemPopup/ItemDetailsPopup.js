import React from 'react'

import { DetailsContainer, Heading, SubText, NoteHeading, NoteSection, DeleteButton } from './itemDetailsStyle'
import { CloseButton, ImgPreview, Panel, PanelWrapper, XIcon } from './itemPopupStyle'
import dayjs from 'dayjs'
import useListStore from '../../stores/useListStore'
import { deleteItemFromDB } from '../../services/items'

const ItemDetailsPopup = ({ item, isOpen, onClose }) => {
  const { deleteItem } = useListStore()
  const { itemID, name, authorID, dateAdded, note, imageURL } = item
  const { listID } = useListStore()
  const formattedDateAdded = `Item listed by ${authorID || 'UNKNOWN USER'} on ${dayjs(dateAdded).format(
    ' dddd, Do MMMM'
  )}`

  return (
    <PanelWrapper dimBackground={isOpen}>
      <Panel isOpen={isOpen}>
        <DetailsContainer>
          <div>
            <Heading>{name}</Heading>
            <SubText>{formattedDateAdded}</SubText>
          </div>
          <div>
            <NoteHeading>Note</NoteHeading>
            <NoteSection>{note || 'There is no note for this item.'}</NoteSection>
          </div>
          {imageURL && <ImgPreview src={imageURL} />}
          <DeleteButton
            onClick={() => {
              if (window.confirm('Are you sure you would like to delete this item?')) {
                deleteItem(itemID)
                deleteItemFromDB({ listID, itemID })
                onClose()
              }
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
