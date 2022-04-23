import React, { useEffect } from 'react'
import { getListByID } from '../../services/lists'
import useListsStore from '../../stores/useListsStore'
import useListStore from '../../stores/useListStore'
import useUserStore from '../../stores/useUserStore'
import { useNavigate } from 'react-router-dom'

import { CardContainer, ListName, LeaveListButton, LinkWrapper } from './listCardStyle'
import { removeUserFromList } from '../../services/lists'

const ListCard = ({ listID, name }) => {
  const { loadList } = useListStore()
  const { lists, leaveList } = useListsStore()
  const { userID } = useUserStore()
  const navigate = useNavigate()

  const handleLeaveList = async () => {
    if (window.confirm('Are you sure you would like to leave this list? This action CANNOT BE UNDONE!')) {
      // Remove list from gui
      leaveList(listID)
      // Remove user association to list in backend
      removeUserFromList({ userID, listID })
    }
  }

  return (
    <CardContainer>
      <LinkWrapper to={`/lists/${listID}`}>
        <ListName>{name || 'Untitled List'}</ListName>
      </LinkWrapper>
      <LeaveListButton
        onClick={e => {
          e.stopPropagation()
          handleLeaveList()
        }}
      />
    </CardContainer>
  )
}

export default ListCard
