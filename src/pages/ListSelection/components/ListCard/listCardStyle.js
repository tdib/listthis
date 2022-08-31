import { styled } from 'goober'

export const CardContainer = styled('div')`
  position: relative;
`

export const CardSurface = styled('button')`
  position: relative;
  display: flex;
  padding: 1.75em 2.75em 1.75em 1.5em;
  border-radius: .5em;
  height: fit-content;
  width: 100%;
  background: var(--surface);
  word-break: break-word;
  border: none;

  &:hover {
    filter: brightness(1.15);
    cursor: pointer;
  }
`

export const Title = styled('h3')`
  color: var(--text);
  text-align: left;
  font-size: 1.75em;
  margin: 0;
  font-weight: bolder;
`

export const LeaveButtonContainer = styled('button')`
  color: var(--text-secondary);
  position: absolute;
  right: .35em;
  top: .35em;
  background: none;
  border: none;
  padding: 0;

  &:hover {
    color: var(--text);
    cursor: pointer;
  }

  svg {
    display: block;
  }
`