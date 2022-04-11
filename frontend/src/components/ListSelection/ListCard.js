import React from 'react'
import { getListByID } from '../../services/items'
import useListStore from '../../stores/useListStore'

import { CardContainer, ListName } from './listCardStyle'

const ListCard = ({ id, name }) => {
  const items = useListStore(s => s.items)
  const loadList = useListStore(s => s.loadList)

  return (
    <>
      <CardContainer
        onClick={() => {
          // loadList(getListByID(id))
          getListByID(id).then(list => loadList(list))
          // console.log(getListByID(id))
          console.log('Items:', items)
        }}
      >
        <ListName>{name || 'List Name'}</ListName>
      </CardContainer>
    </>
  )
}

export default ListCard
