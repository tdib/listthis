import { styled } from 'goober'
import { ChevronLeft } from 'lucide-react'

export const HeaderContainer = styled('div')`
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid var(--text-secondary);
  padding: .5em 0em;
  margin: .5em 0em;
  align-items: center;
`

export const BackButton = styled(ChevronLeft)`
  color: var(--text-secondary);
  margin-right: 1em;

  &:hover {
    color: var(--text);
    cursor: pointer;
  }
`