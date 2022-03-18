import React from 'react'

import { Title, Subtitle, HRule } from './headerStyle'
import Moment from 'react-moment'

const Header = () => {
  return (
    <>
      <Title>Todays list</Title>
      <Subtitle>
        Your shopping list for
        <Moment format=' dddd, Do MMMM'></Moment>
      </Subtitle>
      <HRule />
    </>
  )
}

export default Header
