import { styled } from 'goober'
import { X } from 'lucide-react'

export const CardContainer = styled('div')`
  position: relative;
  display: flex;
  padding: 1.5em;
  padding-right: 2.75em;
  border-radius: .5em;
  height: fit-content;
  background: var(--surface);
  word-break: break-word;

  &:hover {
    filter: brightness(1.15);
    cursor: pointer;
  }
`

export const Title = styled('h3')`
  color: var(--text);
  text-align: left;
  font-size: 1.5em;
  margin: 0;
  font-weight: bolder;
`

export const LeaveButton = styled(X)`
  color: var(--text-secondary);
  width: 1.25em;
  position: absolute;
  right: .75em;
  top: .75em;

  &:hover {
    color: var(--text);
  }
`