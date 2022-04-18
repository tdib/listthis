import React, { useState, useCallback } from 'react'
import {
  AllItemsContainer,
  ListItemContainer,
  ItemName,
  ItemNote,
  TextContainer,
  CheckBox,
  MoreButton,
} from './listItemStyle.js'
import ItemDetailsPopup from '../ItemPopup/ItemDetailsPopup.js'
import useListStore from '../../stores/useListStore.js'

const ListItem = ({ item, onClick }) => {
  const { name, note, isChecked } = item
  const [itemDetailsOpen, setItemDetailsOpen] = useState(false)
  return (
    <>
      <ListItemContainer onClick={onClick}>
        <CheckBox checked={isChecked} />
        <TextContainer>
          <ItemName>{name}</ItemName>
          <ItemNote>{note}</ItemNote>
        </TextContainer>
        <MoreButton
          onClick={e => {
            e.stopPropagation()
            setItemDetailsOpen(true)
          }}
        />
      </ListItemContainer>
      <ItemDetailsPopup item={item} isOpen={itemDetailsOpen} onClose={() => setItemDetailsOpen(false)} />
    </>
  )
}

const ListItems = () => {
  const { toggleItem } = useListStore()
  const items = useListStore(s => s.items) ?? []

  const handleClick = useCallback(clickedItem => {
    toggleItem(clickedItem.itemID)
  }, [])

  return (
    <AllItemsContainer>
      {items.map(item => (
        <ListItem key={item.itemID} onClick={() => handleClick(item)} item={item} />
      ))}
    </AllItemsContainer>
  )
}

export default ListItems
