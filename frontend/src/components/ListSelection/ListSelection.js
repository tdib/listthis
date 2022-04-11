import React from 'react'
import ListCard from './ListCard'

import { Title, Container, TileGrid } from './listSelectionStyle'

const ListSelection = userId => {
  // get lists by user id

  return (
    <Container>
      <Title>Your lists</Title>
      <TileGrid>
        <ListCard />
        <ListCard />
        <ListCard />
        <ListCard />
        <ListCard />
        <ListCard />
        <ListCard />
        <ListCard />
        <ListCard />
        <ListCard />
        <ListCard />
        <ListCard />
        <ListCard />
        {/* map lists to cards */}
      </TileGrid>
    </Container>
  )
}

export default ListSelection
