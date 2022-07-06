import { styled } from 'goober'
import { LogOut } from 'lucide-react'

export const CardsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1.25em;
  margin-bottom: 5em;
`

export const HeaderContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
`

export const LogOutButtonContainer = styled('button')`
  color: var(--text-secondary);
  align-self: center;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: white;
  }
  
  svg {
    display: block;
  }
`

export const InfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  flex: 1;
  padding: 1em;
  box-sizing: border-box;
  margin: auto;
  justify-content: center;
  margin-bottom: 4em;
`
