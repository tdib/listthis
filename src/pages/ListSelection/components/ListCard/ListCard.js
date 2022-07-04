import { CardContainer, Title, LeaveButton } from './listCardStyle'

import { useListStore, useListsStore } from '/src/stores'
import { auth, leaveListDB } from '/src/services'

import { useNavigate, Navigate } from 'react-router-dom'

const ListCard = ({ data }) => {
  const navigate = useNavigate()
  const { listID, name, items } = data
  const { loadList } = useListStore()
  const { leaveList } = useListsStore()

  return <CardContainer onClick={() => {
    loadList(data)
    navigate(`/list/${listID}`)
  }}>
    <Title>{name}</Title>
    <LeaveButton onClick={e => {
      e.stopPropagation()
      if (window.confirm('Are you sure you want to leave this list? This action cannot be undone!')) {
        // Remove user from firestore list
        leaveListDB({ UUID: auth.currentUser.uid, listID: listID})
        // Remove user from zustand store list
        leaveList(listID)
      }
    }} />
  </CardContainer>
}

export default ListCard