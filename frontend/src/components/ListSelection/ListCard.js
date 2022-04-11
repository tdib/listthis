import React from 'react'
import { getListByID } from '../../services/items'
import useListStore from '../../stores/useListStore'

import { CardContainer, ListName } from './listCardStyle'

const ListCard = ({ id, name }) => {
  const list = useListStore(s => s.list)
  const loadList = useListStore(s => s.loadList)
  return (
    <>
      <CardContainer
        onClick={() => {
          console.log('ID:', id)
          loadList(getListByID(id))
        }}
      >
        <ListName>{name || 'List Name'}</ListName>
      </CardContainer>
    </>
  )
}

export default ListCard
