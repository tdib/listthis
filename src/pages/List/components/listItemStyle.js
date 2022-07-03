import { styled } from 'goober'
import { MoreVertical } from 'lucide-react'
import { Image } from 'lucide-react'

export const AllItemsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  margin-bottom: 2em;
`

export const ListItemContainer = styled('div')`
  display: flex;
  user-select: none;
  border-radius: 0.5em;
  padding: .25em;

  &:hover {
    background-color: var(--surface);

    > button {
      transform: scale(1.05);
    }
  }

  > button {
    transform: scale(1);
    transition: transform 0.2s;
  }

  &:active > button {
    transform: scale(0.95);
  }
`

export const TextContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 85%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const ItemName = styled('span')`
  color: var(--text);
  display: inline-block;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const SubLineWrapper = styled('div')`
  display: flex;
  align-items: center;
`

export const ImageIcon = styled(Image)`
  color: var(--text-secondary);
  margin-right: 0.25em;
  margin-top: 0.2em;
`

export const ItemNote = styled('span')`
  display: inline-block;
  color: var(--text-secondary);
  font-size: 0.85em;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const CheckBox = styled('button')`
  align-self: center;
  border-style: solid;
  border-color: ${p => (p.checked ? 'var(--white)' : 'var(--text-secondary)')};
  border-width: 0.15em;
  background: ${p => (p.checked ? 'var(--brand)' : 'none')};
  border-radius: 1em;
  width: 2em;
  height: 2em;
  margin: 0.6em;
  margin-right: 1em;
`

export const MoreButton = styled(MoreVertical)`
  margin-left: auto;
  margin-right: 0.5em;
  align-self: center;
  color: var(--text-secondary);

  &:hover {
    color: var(--text);
  }

  &:active {
    transform: scale(0.95);
  }
`
