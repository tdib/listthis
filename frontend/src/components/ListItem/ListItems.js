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
import { getItems, getListByID } from '../../services/items.js'
import ItemDetailsPopup from '../ItemPopup/ItemDetailsPopup.js'
import debounce from 'lodash.debounce'
import { createOrUpdateItem } from '../../services/items'
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
  const loadList = useListStore(s => s.loadList)
  const toggleItem = useListStore(s => s.toggleItem)
  const items = useListStore(s => s.items) ?? []
  const id = 'test-id-list'

  useEffect(() => {
    getListByID(id).then(items => loadList(items))
  }, [])

  // const handleClick = useCallback(
  //   debounce(clickedItem => {
  //     setItems(items.map(item => (item.id === clickedItem.id ? { ...item, isChecked: !item.isChecked } : item)))
  //     createOrUpdateItem({ ...clickedItem, isChecked: !clickedItem.isChecked })
  //   }, 250),
  //   [items]
  // )

  const handleClick = useCallback(clickedItem => {
    // setItems(items.map(item => (item.id === clickedItem.id ? { ...item, isChecked: !item.isChecked } : item)))
    toggleItem(clickedItem.id)
    // listStore(s => s.toggleItem(clickedItem.id))
  }, []) // items?

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
