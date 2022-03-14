import styled from 'styled-components'
import Checkbox from 'react-custom-checkbox'

export const AllItemsContainer = styled.div`
  background-color: ${p => p.theme.primary};
  display: flex;
  flex-direction: column;
  // background-color: blue;
  gap: 2rem;
`

export const blah = styled.div`
  background-color: red;
`

export const ListItemContainer = styled.div`
  display: flex;
  // align-content: center;
  width: 60%;
  background-color: ${p => p.theme.tertiary};
`

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const ItemName = styled.span`
  color: ${p => p.theme.mainText};
  // color: red;
  display: inline-block;
`

export const ItemNote = styled.span`
  display: inline-block;
  color: ${p => p.theme.quaternary};
`

export const CheckBox = styled(Checkbox)`
  display: block;
  border-color: red;
  background-color: red;
  // display: inline-block;
  // background-color: ${p => (p.isSelected ? 'green' : 'pink')};
  // width: 2rem;
  // height: 2rem;
  // border-radius: 1rem;
`
