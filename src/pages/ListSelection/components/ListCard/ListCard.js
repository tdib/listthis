import { CardContainer, Title, LeaveButtonContainer } from './listCardStyle'

import { useListStore, useListsStore } from '/src/stores'
import { auth, leaveListDB } from '/src/services'

import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'

const ListCard = ({ data, openWarningFn }) => {
  const navigate = useNavigate()
  const { listUID, name, items } = data
  const loadList = useListStore(s => s.loadList)
  const leaveList = useListsStore(s => s.leaveList)

  return <CardContainer onClick={() => {
    loadList(data)
    navigate(`/list/${listUID}`)
  }}>
    <Title>{name}</Title>
    <LeaveButtonContainer title='Leave list' onClick={e => {
      e.stopPropagation()
      openWarningFn()
    }}>
      <X />
    </LeaveButtonContainer>
  </CardContainer>
}

export default ListCard