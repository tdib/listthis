import React from 'react'
import { AllItemsContainer, ListItemContainer, ItemName, ItemNote, TextContainer } from './listItemStyle.js'

import { database } from './items'
// import database from './items.json'

import { Checkbox } from 'pretty-checkbox-react'

const ListItem = ({ item }) => {
  let { name, note, isSelected } = item

  const handleClick = () => {
    console.log('PRESSED')
    isSelected = !isSelected
    console.log(isSelected)
  }

  return (
    <ListItemContainer>
      {/* <CheckBox isSelected={isSelected} onClick={handleClick}></CheckBox> */}
      <Checkbox variant='fill' shape='round'>
        {' '}
        adskfljsda
      </Checkbox>
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
