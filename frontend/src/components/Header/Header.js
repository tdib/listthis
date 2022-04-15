import React from 'react'

import { Title, Subtitle, HRule, BackButton } from './headerStyle'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import useListStore from '../../stores/useListStore'
import { updateList } from '../../services/lists'

const Header = () => {
  dayjs.extend(advancedFormat)
  // const listName = useListStore(s => s.name) ?? 'Todays list'
  const { listID, name: listName, items } = useListStore()
  const { unloadList } = useListStore()

  const handleBackButton = () => {
    updateList({ listID, items })
    unloadList()
  }

  return (
    <>
      <BackButton onClick={handleBackButton} />
      <Title>{listName || 'Untitled List'}</Title>
      <Subtitle>Your list for {dayjs().format(' dddd, Do MMMM')}</Subtitle>
      <HRule />
    </>
  )
}

export default Header
