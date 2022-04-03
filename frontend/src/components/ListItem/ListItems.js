import React, { useEffect, useState, useCallback } from 'react'
import {
  AllItemsContainer,
  ListItemContainer,
  ItemName,
  ItemNote,
  TextContainer,
  CheckBox,
  MoreButton,
  Blah,
} from './listItemStyle.js'
import { getItems } from '../../services/items.js'
import ItemDetailsPopup from '../ItemPopup/ItemDetailsPopup.js'
import AddItemPopup from '../ItemPopup/AddItemPopup.js'

const ListItem = ({ item, onClick }) => {
  const { name, note, isSelected } = item
  const [itemDetailsOpen, setItemDetailsOpen] = useState(false)
  return (
    <>
      <ListItemContainer onClick={onClick}>
        <CheckBox selected={isSelected} />
        <TextContainer>
          <ItemName>{name}</ItemName>
          <ItemNote>{note}</ItemNote>
        </TextContainer>
        <MoreButton
          onClick={e => {
            e.stopPropagation()
            setItemDetailsOpen(true)
            console.log(name)
          }}
        />
      </ListItemContainer>
      <ItemDetailsPopup item={item} isOpen={itemDetailsOpen} onClose={() => setItemDetailsOpen(false)} />
    </>
  )
}

const ListItems = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    getItems().then(items => setItems(items))
  }, [])

  const handleClick = useCallback(
    clickedItem => {
      setItems(items.map(item => (item.id === clickedItem.id ? { ...item, isSelected: !item.isSelected } : item)))
    },
    [items]
  )

  return (
    <AllItemsContainer>
      {items.map(item => (
        // <ListItem key={item.id} onClick={() => handleClick(item)} {...item} />
        <ListItem key={item.id} onClick={() => handleClick(item)} item={item} />
      ))}
    </AllItemsContainer>
  )
}

export default ListItems
