import React, { useEffect, useState, useCallback } from 'react'
import {
  CB,
  AllItemsContainer,
  ListItemContainer,
  ItemName,
  ItemNote,
  TextContainer,
  CheckBox,
} from './listItemStyle.js'
import { getItems } from '../../services/items.js'

const ListItem = ({ name, note, isSelected, onClick }) => {
  return (
    <ListItemContainer onClick={onClick}>
      {/* <CheckBox isSelected={isSelected} onClick={handleClick}></CheckBox> */}
      <CB selected={isSelected} />
      {/* <CheckBox checked={isSelected} borderRadius={20} /> */}
      <TextContainer>
        <ItemName>{name}</ItemName>
        <ItemNote>{note}</ItemNote>
      </TextContainer>
    </ListItemContainer>
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
        <ListItem key={item.id} onClick={() => handleClick(item)} {...item} />
      ))}
    </AllItemsContainer>
  )
}

export default ListItems
