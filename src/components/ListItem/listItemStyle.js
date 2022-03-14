import styled from 'styled-components'

export const AllItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: blue;
  gap: 2rem;
`

export const ListItemContainer = styled.div`
  display: flex;
  // align-content: center;
  width: 60%;
  background-color: red;
`

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const ItemName = styled.span`
  color: black;
  display: inline-block;
`

export const ItemNote = styled.span`
  display: inline-block;
`

export const CheckBox = styled.button`
  display: inline-block;
  background-color: ${p => (p.isSelected ? 'green' : 'pink')};
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
`
