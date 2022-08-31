import { styled } from 'goober'
import { LogOut } from 'lucide-react'

export const CardsContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25em;
  margin-bottom: 5em;
  justify-content: center;

  @media (max-width: 450px) {
    flex-direction: column;
    height: fit-content;
    flex-grow: 0;
  }
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
    color: var(--text);
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
