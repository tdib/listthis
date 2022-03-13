import React from 'react'
// import { ListItemContainer } from './listItemStyle.js'

import { database } from './items'

const ListItem = (name, note, isSelected) => {
  return (
    <>
      <p>{name}</p>
      <p>{note}</p>
    </>
  )
}

const ListItems = () => {
  // return database.allItems.map(item => <ListItem item={item} />)
  console.log(database.allItems.map(i => i))
  return database.allItems
  // return database.allItems.map(item => (
  //   <ListItem
  //     key={item.name}
  //     name={item.name}
  //     note={item.note}
  //     isSelected={item.isSelected}
  //   />
  // ))
}

export default ListItems
