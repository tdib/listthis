import { styled } from 'goober'
import { Image } from 'lucide-react'

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
  display: inline-block;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;

  color: ${p => p.checked ? 'var(--text-secondary)' : 'var(--text)'};
  transition: all .2s;
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
  border-radius: 100%;
  width: 2em;
  min-width: 2em;
  height: 2em;
  margin: 0.6em;
  margin-right: 1em;
`

export const MoreDetailsContainer = styled('button')`
  background: none;
  border: none;
  margin: auto;
  padding: 0;
  margin-right: 0.5em;
  align-self: center;
  color: var(--text-secondary);
  font: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 1.25em;


  &:hover {
    color: var(--text);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`
