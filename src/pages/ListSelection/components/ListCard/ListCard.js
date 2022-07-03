import { CardContainer, Title, Close } from './listCardStyle'
import { Redo, X } from 'lucide-react'

const XStyle = {
  color: 'var(--text-secondary)',
  width: '1.25em',
  position: 'absolute',
  right: '.75em',
  top: '.75em',
}

const leaveList = ({ list }) => {

}


const ListCard = ({ text, list }) => {
  return <CardContainer onClick={() => {}}>
    <Title>{text}</Title>
    <X style={XStyle} onClick={e => {
      e.preventDefault()
      leaveList(list)
    }} />
  </CardContainer>
}

export default ListCard