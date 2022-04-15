import React, { useEffect } from 'react'
import ListCard from './ListCard'

import { Title, Container, TileGrid, InfoMessage } from './listSelectionStyle'
import { getListsByUserID } from '../../services/lists'
import useListsStore from '../../stores/useListsStore'
import useUserStore from '../../stores/useUserStore'
import useListStore from '../../stores/useListStore'
import { TailSpin } from 'react-loader-spinner'

const ListSelection = () => {
  const loadLists = useListsStore(s => s.loadLists)
  const { lists } = useListsStore()
  const { userID: currUserID } = useUserStore()

  // Load current users associated lists
  useEffect(() => {
    getListsByUserID(currUserID).then(lists => loadLists(lists))
  }, [])

  return (
    <Container>
      <Title>Your lists</Title>
      <TileGrid>
        {lists ?
          lists.length === 0 ?
            <InfoMessage>You are not in any lists! Create one by clicking the '+' button at the bottom of the screen!</InfoMessage> :
            lists.map(list => <ListCard key={list.listID} listID={list.listID} name={list.name} />)
        :
          <TailSpin color={'white'} />
        }
      </TileGrid>
    </Container>
  )
}

export default ListSelection
