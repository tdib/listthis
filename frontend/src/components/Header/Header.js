import React from 'react'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { v4 as uuid } from 'uuid'

import { Title, Subtitle, BackButton, ShareButton } from './headerStyle'
import useListStore from '../../stores/useListStore'
import { updateList } from '../../services/lists'
import { Link } from 'react-router-dom'
import { createInviteLink } from '../../services/invites'

const Header = () => {
  dayjs.extend(advancedFormat)
  const { listID, name: listName, items } = useListStore()
  const { unloadList } = useListStore()

  const handleBackButton = () => {
    updateList({ listID, items })
    unloadList()
  }

  const handleShareButton = () => {
    const inviteLink = createInviteLink({ inviteID: uuid(), listID, expiry: Math.round(Date.now() + 86400) }).then(x =>
      navigator.clipboard.writeText(x)
    )
  }

  return (
    <>
      <Link to='/lists'>
        <BackButton onClick={handleBackButton} />
      </Link>
      <Title>{listName || 'Untitled List'}</Title>
      <Subtitle>Your list for {dayjs().format(' dddd, Do MMMM')}</Subtitle>
      <ShareButton onClick={handleShareButton} />
    </>
  )
}

export default Header
