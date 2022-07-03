import { CardContainer, Title, Close } from './listCardStyle'
import { X } from 'lucide-react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useListStore } from '/src/stores'

const XStyle = {
  color: 'var(--text-secondary)',
  width: '1.25em',
  position: 'absolute',
  right: '.75em',
  top: '.75em',
}

const leaveList = ({ list }) => {

}

const ListCard = ({ data }) => {
  const navigate = useNavigate()
  const { listID, name, items } = data
  const { loadList } = useListStore()

  return <CardContainer onClick={() => {
    loadList(data)
    navigate(`/list/${listID}`)
  }}>
    <Title>{name}</Title>
    <X style={XStyle} onClick={e => {
      e.preventDefault()
      leaveList(list)
    }} />
  </CardContainer>
}

export default ListCard