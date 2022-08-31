import { styled } from 'goober'
import { forwardRef } from 'react'

export const PopupPanel = styled('form')`
  background-color: var(--surface);
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 30em;
  position: fixed;
  bottom: 0;
  left: 0;
  border-radius: .75em .75em 0 0;
  box-sizing: border-box;
  padding: 1.5em;
  z-index: 1;

  @media (max-width: 450px) {
    height: min-content;
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
  background-color: var(--background);
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  max-height: 80vh;
  box-sizing: border-box;
  border-radius: .4em;
  border: none;
  padding: .75em;
  font-size: 1em;

  &:focus {
    outline: 2px solid var(--brand);
  }
`

export const CloseButtonContainer = styled('button')`
  width: 2em;
  height: 2em;
  position: absolute;
  top: .5em;
  right: .5em;
  color: var(--text-secondary);
  background: none;
  border: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
  font: inherit;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--text);
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`


// Warning panel only
export const WarningContainer = styled('div')`
  position: fixed;
  background-color: var(--shadow);
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
`

export const WarningPanel = styled('div')`
  position: absolute;
  border-radius: .5em;
  background: var(--surface);
  box-sizing: border-box;
  padding: 1.5em 2.5em;
  margin: 2em 1em;
  top: 50%;
  transform: translateY(calc(-50% - var(--tabbar-size)));
`

export const ButtonContainer = styled('div')`
  display: flex;
  gap: 1em;
  justify-content: right;
`


// Item details popup only