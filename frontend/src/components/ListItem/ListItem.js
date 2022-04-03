import React, { useEffect, useState, useCallback } from 'react'
import {
  AllItemsContainer,
  ListItemContainer,
  ItemName,
  ItemNote,
  TextContainer,
  CheckBox,
  MoreButton,
} from './listItemStyle.js'
import { getItems } from '../../services/items.js'
import debounce from 'lodash.debounce'

const ListItem = ({ name, note, isSelected, onClick }) => {
  return (
    <ListItemContainer onClick={onClick}>
      <CheckBox selected={isSelected} />
      <TextContainer>
        <ItemName>{name}</ItemName>
        <ItemNote>{note}</ItemNote>
      </TextContainer>
      <MoreButton onClick={() => console.log(name)} />
    </ListItemContainer>
  )
}

const ListItems = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    getItems().then(items => setItems(items))
  }, [])

  // const handleClick = useCallback(
  //   debounce(clickedItem => {
  //     console.log('Changing status of ' + clickedItem.name)
  //   }, 2000),
  //   [items]
  // )

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
