import React from 'react'

import { CardContainer, ListName } from './listCardStyle'

const ListCard = ({ id, name }) => {
  return (
    <>
      <CardContainer>
        <ListName>{name || 'List Name'}</ListName>
      </CardContainer>
    </>
  )
}

export default ListCard
