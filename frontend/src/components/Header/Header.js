import React from 'react'

import { Title, Subtitle, HRule } from './headerStyle'
import dayjs from 'dayjs'
import * as advancedFormat from 'dayjs/plugin/advancedFormat'

const Header = () => {
  dayjs.extend(advancedFormat)
  return (
    <>
      <Title>Todays list</Title>
      <Subtitle>Your shopping list for {dayjs().format(' dddd, Do MMMM')}</Subtitle>
      <HRule />
    </>
  )
}

export default Header
