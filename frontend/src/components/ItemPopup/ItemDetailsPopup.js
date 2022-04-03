import React from 'react'

import { DetailsContainer, Heading, SubText, NoteHeading, NoteSection, DeleteButton } from './itemDetailsStyle'
import { CloseButton, Panel, PanelWrapper, XIcon } from './itemPopupStyle'
import dayjs from 'dayjs'

const ItemDetailsPopup = ({ item, isOpen, onClose }) => {
  const { name, authorID, dateAdded, note, imageURL } = item
  console.log(item)
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
          <DeleteButton>Delete</DeleteButton>
        </DetailsContainer>
        <CloseButton onClick={onClose} doDisplay={isOpen}>
          <XIcon />
        </CloseButton>
      </Panel>
    </PanelWrapper>
  )
}

export default ItemDetailsPopup
