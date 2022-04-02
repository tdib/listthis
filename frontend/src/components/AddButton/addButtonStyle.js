import styled from 'styled-components'
import { Plus } from 'lucide-react'

export const AddButtonContainer = styled.button`
  border: none;
  box-shadow: 0 0.25rem 0.25rem #00000044;
  border-radius: 50%;
  background-color: ${p => p.theme.accentPrimary};
  height: 3rem;
  width: 3rem;
  bottom: 1rem;
  position: absolute;
  /* position: flex; */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.05s;

  :hover {
    cursor: pointer;
    filter: brightness(85%);
  }

  &:active {
    transform: scale(0.925);
    transition: transform 0.05s;
  }
`

export const PlusIcon = styled(Plus)`
  color: white;
  transform: scale(125%);
`
