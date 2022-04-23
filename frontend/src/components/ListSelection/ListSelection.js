import React, { useEffect } from 'react'
import ListCard from './ListCard'

import { TileGrid, InfoMessage } from './listSelectionStyle'
import { getListsByUserID } from '../../services/lists'
import { useListsStore, useUserStore } from '../../stores'
import { TailSpin } from 'react-loader-spinner'

const ListSelection = () => {
  const { lists, loadLists } = useListsStore()
  const { userID } = useUserStore()

  // Load current users associated lists
  useEffect(() => {
    getListsByUserID(userID).then(lists => loadLists(lists))
  }, [])

  return (
    <>
      <TileGrid>
        {lists ? (
          lists.length === 0 ? (
            <InfoMessage>
              You are not in any lists! Create one by clicking the '+' button at the bottom of the screen!
            </InfoMessage>
          ) : (
            lists.map(list => <ListCard key={list.listID} listID={list.listID} name={list.name} />)
          )
        ) : (
          <TailSpin color={'white'} />
        )}
      </TileGrid>
    </>
  )
}

export default ListSelection
