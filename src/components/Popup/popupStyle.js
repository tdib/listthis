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

// Warning panel only
export const WarningPanel = styled('div')`
  --width: 22em;
  --height: 12.5em;
  position: fixed;
  border-radius: .5em;
  background: var(--surface);
  width: var(--width);
  height: var(--height);
  box-sizing: border-box;
  padding: 1.5em 2.5em;
  /* margin-bottom: 6em; */
  top: calc(50% - calc(var(--height) / 2));
  left: calc(50% - calc(var(--width) / 2));
`

export const ButtonContainer = styled('div')`
  display: flex;
  gap: 1em;
  justify-content: right;
`
