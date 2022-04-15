import React from 'react'
import { getListByID } from '../../services/lists'
import useListsStore from '../../stores/useListsStore'
import useListStore from '../../stores/useListStore'
import useUserStore from '../../stores/useUserStore'

import { CardContainer, ListName, LeaveListButton } from './listCardStyle'
import { removeUserFromList } from '../../services/lists'

const ListCard = ({ listID, name }) => {
  const { loadList } = useListStore()
  const { lists, leaveList } = useListsStore()
  const { userID } = useUserStore()

  return (
    <>
      <CardContainer
        onClick={() => {
          for (let list of lists) {
            if (list.listID === listID) {
              loadList(list)
            }
          }
          // getListByID(id).then(list => loadList(list))
        }}
      >
        <ListName>{name || 'Untitled List'}</ListName>
        <LeaveListButton onClick={(e) => {
          e.stopPropagation()
          if (window.confirm('Are you sure you would like to leave this list? This action CANNOT BE UNDONE!')) {
            leaveList(listID)
            removeUserFromList({ userID, listID })
          }
        }} />
      </CardContainer>
    </>
  )
}

export default ListCard
