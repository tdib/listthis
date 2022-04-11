import React from 'react'

import { Title, Subtitle, HRule, BackButton } from './headerStyle'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import useListStore from '../../stores/useListStore'

const Header = () => {
  dayjs.extend(advancedFormat)
  const listName = useListStore(s => s.name) ?? 'Todays list'
  const unloadList = useListStore(s => s.unloadList)
  return (
    <>
      <BackButton onClick={unloadList} />
      <Title>{listName}</Title>
      <Subtitle>Your shopping list for {dayjs().format(' dddd, Do MMMM')}</Subtitle>
      <HRule />
    </>
  )
}

export default Header
