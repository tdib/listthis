import React from 'react'
import { getListByID } from '../../services/lists'
import useListStore from '../../stores/useListStore'

import { CardContainer, ListName } from './listCardStyle'

const ListCard = ({ id, name }) => {
  const loadList = useListStore(s => s.loadList)

  return (
    <>
      <CardContainer
        onClick={() => {
          getListByID(id).then(list => loadList(list))
        }}
      >
        <ListName>{name || 'List Name'}</ListName>
      </CardContainer>
    </>
  )
}

export default ListCard
