import { styled } from 'goober'

export const HeaderContainer = styled('div')`
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid var(--text-secondary);
  padding: .5em 0em;
  margin: .5em 0em;
  align-items: center;
`

export const BackButtonContainer = styled('button')`
  width: 2em;
  height: 2em;
  color: var(--text-secondary);
  background: none;
  border: none;
  margin: 0;
  margin-right: .75em;
  padding: 0;
  font: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    color: var(--text);
  }

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }

`

export const AllItemsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding-block-end: 2em;
`