import React from 'react'
import {
  AllItemsContainer,
  ListItemContainer,
  ItemName,
  ItemNote,
  TextContainer,
} from './listItemStyle.js'

import { database } from './items'
// import database from './items.json'

import Checkbox from 'react-custom-checkbox'

const ListItem = ({ item }) => {
  let { name, note, isSelected } = item

  return (
    <ListItemContainer>
      {/* <CheckBox isSelected={isSelected} onClick={handleClick}></CheckBox> */}
      <Checkbox checked={isSelected} borderRadius={20} />
      <TextContainer>
        <ItemName>{name}</ItemName>
        <ItemNote>{note}</ItemNote>
      </TextContainer>
    </ListItemContainer>
  )
}

const ListItems = () => {
  return (
    <AllItemsContainer>
      {database.allItems.map(item => (
        <ListItem key={item.name} item={item} />
      ))}
    </AllItemsContainer>
  )
}

export default ListItems
