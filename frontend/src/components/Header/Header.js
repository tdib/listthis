import { useState } from 'react'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { v4 as uuid } from 'uuid'

import { Title, Subtitle, BackButton, ShareButton } from './headerStyle'
import useListStore from '../../stores/useListStore'
import { updateList } from '../../services/lists'
import { Link, useNavigate } from 'react-router-dom'
import { createInviteLink } from '../../services/invites'

const Header = () => {
  dayjs.extend(advancedFormat)
  const { listID, name: listName, items } = useListStore()
  const { unloadList } = useListStore()
  const [hasInvited, setHasInvited] = useState(false)

  const handleBackButton = () => {
    updateList({ listID, items })
    unloadList()
  }

  const handleShareButton = hasInvited => {
    // Restrict user from generating multiple links on the same load
    if (!hasInvited) {
      createInviteLink({ inviteID: uuid(), listID, expiry: Math.round(Date.now() + 86400) })
        .then(x => navigator.clipboard.writeText(x))
        .then(setHasInvited(true))
        .then(window.alert('An invite link to this list has been copied to clipboard. This will expire in one day.'))
    }
  }

  return (
    <>
      <Link to='/lists'>
        <BackButton onClick={handleBackButton} />
      </Link>
      <Title>{listName || 'Untitled List'}</Title>
      <Subtitle>Your list for {dayjs().format(' dddd, Do MMMM')}</Subtitle>
      <ShareButton onClick={() => handleShareButton(hasInvited)} disabled={hasInvited} />
    </>
  )
}

export default Header
