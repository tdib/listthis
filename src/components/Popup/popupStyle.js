import { styled } from 'goober'
import { X } from 'lucide-react'
import { forwardRef } from 'react'

export const PopupPanel = styled('form')`
  background-color: var(--surface);
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 30em;
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: .75em .75em 0 0;
  /* box-shadow: 0px 0px 0px 100vh var(--shadow); */
  box-sizing: border-box;
  padding: 1.5em;
  z-index: 1;
`

export const CloseButton = styled(X)`
  width: 2em;
  height: 2em;
  position: absolute;
  top: .5em;
  right: .5em;
  color: var(--text-secondary);

  &:hover {
    color: var(--text);
    cursor: pointer;
  }
`

export const Shadow = styled('div')`
  position: absolute;
  left: 0;
  top: 0;
  background: var(--shadow);
  width: 100%;
  height: 100%;
`

export const TitleField = styled('input', forwardRef)`
  background: none;
  border: none;
  font-size: 2em;
  font-weight: bold;
  width: 100%;
  outline: none;
  color: var(--text);
  margin-bottom: .4em;
`

export const NoteField = styled('textarea', forwardRef)`
  margin-bottom: 1em;
`