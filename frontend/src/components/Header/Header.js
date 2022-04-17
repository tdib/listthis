import React from 'react'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

import { Title, Subtitle, HRule, BackButton } from './headerStyle'
import useListStore from '../../stores/useListStore'
import { updateList } from '../../services/lists'
import { Link } from 'react-router-dom'

const Header = () => {
  dayjs.extend(advancedFormat)
  const { listID, name: listName, items } = useListStore()
  const { unloadList } = useListStore()

  const handleBackButton = () => {
    updateList({ listID, items })
    unloadList()
  }

  return (
    <>
      <Link to='/lists'>
        <BackButton onClick={handleBackButton} />
      </Link>
      <Title>{listName || 'Untitled List'}</Title>
      <Subtitle>Your list for {dayjs().format(' dddd, Do MMMM')}</Subtitle>
      <HRule />
    </>
  )
}

export default Header
