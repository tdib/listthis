import { CardContainer, Title, LeaveButton } from './listCardStyle'

import { useListStore, useListsStore } from '/src/stores'
import { auth, leaveListDB } from '/src/services'

import { useNavigate } from 'react-router-dom'

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
    <LeaveButton onClick={e => {
      e.stopPropagation()
      openWarningFn()
    }} />
  </CardContainer>
}

export default ListCard