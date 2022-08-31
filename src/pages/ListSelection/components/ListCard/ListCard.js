import { CardContainer, CardSurface, Title, LeaveButtonContainer } from './listCardStyle'

import { useListsStore } from '/src/stores'
import { auth, leaveListDB } from '/src/services'

import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'

const ListCard = ({ data, openWarningFn }) => {
  const navigate = useNavigate()
  const { listUID, name, items } = data
  const setCurrListUID = useListsStore(s => s.setCurrListUID)
  const leaveList = useListsStore(s => s.leaveList)

  return <CardContainer>
    <CardSurface onClick={() => {
      setCurrListUID(listUID)
      navigate(`/list/${listUID}`)
    }}>
      <Title>{name}</Title>
    </CardSurface>
    <LeaveButtonContainer title='Leave list' onClick={e => {
      e.stopPropagation()
      openWarningFn()
    }}>
      <X />
    </LeaveButtonContainer>
  </CardContainer>
}

export default ListCard