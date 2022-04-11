import React, { useEffect } from 'react'
import ListCard from './ListCard'

import { Title, Container, TileGrid, TileGridContainer } from './listSelectionStyle'
import { getListsByUserID } from '../../services/items'
import useListsStore from '../../stores/useListsStore'

const ListSelection = userId => {
  const loadLists = useListsStore(s => s.loadLists)
  const lists = useListsStore(s => s.lists)

  // get lists by user id
  // const userLists = getListsByUserID('thisisauserid')

  useEffect(() => {
    getListsByUserID('thisisauserid').then(lists => loadLists(lists))
  }, [])

  // const blah = getListsByUserID('thisisauserid')
  //   .then(x => loadLists(x))
  //   .then(console.log('done'))
  //   .then(console.log('lists:', lists))
  // console.log('3', blah)

  // loadLists(getListsByUserID('thisisauserid'))
  // console.log(lists)

  // TODO: lists wont load into variable

  return (
    <Container>
      <Title>Your lists</Title>
      <TileGrid>
        {/* map lists to cards */}
        {lists ? lists.map(list => <ListCard key={list.id} id={list.id} name={list.name} />) : <p>Loading lists...</p>}
      </TileGrid>
    </Container>
  )
}

export default ListSelection
