import { styled } from 'goober'
import { LogOut, ChevronLeft } from 'lucide-react'

export const CardsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1.25em;
`

export const HeaderContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
`

export const InfoMessage = styled('span')`
  color: var(--text-secondary);
`

export const LogOutButton = styled(LogOut)`
  color: var(--text-secondary);
  align-self: center;

  &:hover {
    color: white;
    cursor: pointer;
  }
`
