import styled from 'styled-components'
import Checkbox from 'react-custom-checkbox'

export const AllItemsContainer = styled.div`
  background-color: ${p => p.theme.primary};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
`

export const blah = styled.div`
  background-color: red;
`

export const ListItemContainer = styled.div`
  display: flex;
  user-select: none;

  &:hover {
    background-color: ${p => p.theme.secondary};
    border-radius: 0.5rem;

    > button {
      transform: scale(1.1);
    }
  }

  > button {
    transform: scale(1);
    transition: transform 0.2s;
  }

  &:active > button {
    transform: scale(0.9);
  }
`

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const ItemName = styled.span`
  color: ${p => p.theme.textPrimary};
  display: inline-block;
`

export const ItemNote = styled.span`
  display: inline-block;
  color: ${p => p.theme.quaternary};
  font-size: 0.85rem;
`

export const CheckBox = styled(Checkbox)`
  margin: 1rem 0.75rem;
`

export const CB = styled.button`
  align-self: center;
  border-style: solid;
  border-color: ${p => (p.selected ? p.theme.textPrimary : p.theme.quaternary)};
  border-width: 0.1rem;
  background: ${p => (p.selected ? p.theme.accentPrimary : 'none')};
  border-radius: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  margin: 0.6rem;
`
