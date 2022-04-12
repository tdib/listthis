import React, { useEffect } from 'react'
import ListCard from './ListCard'

import { Title, Container, TileGrid, TileGridContainer } from './listSelectionStyle'
import { getListsByUserID } from '../../services/lists'
import useListsStore from '../../stores/useListsStore'
import useUserStore from '../../stores/useUserStore'

const ListSelection = () => {
  const loadLists = useListsStore(s => s.loadLists)
  const lists = useListsStore(s => s.lists)
  const currUserID = useUserStore(s => s.userID)

  // Load current users associated lists
  useEffect(() => {
    getListsByUserID(currUserID).then(lists => loadLists(lists))
  }, [])

  return (
    <Container>
      <Title>Your lists</Title>
      <TileGrid>
        {lists ? lists.map(list => <ListCard key={list.id} id={list.id} name={list.name} />) : <p>Loading lists...</p>}
      </TileGrid>
    </Container>
  )
}

export default ListSelection
