import { styled } from 'goober'
import { forwardRef } from 'react'

export const Container = styled('div')`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: var(--shadow);
  z-index: 2;
`

export const PopupPanel = styled('form')`
  background-color: var(--surface);
  display: flex;
  width: 100%;
  min-height: 30em;
  position: fixed;
  bottom: 0;
  left: 0;
  border-radius: .75em .75em 0 0;
  box-sizing: border-box;
  overflow-y: auto;
  padding-block-end: 2em;
  /* TODO: fixes mobile pushing modal up? */
  overflow-y: visible;

  @media (max-width: 450px) {
    height: min-content;
    min-height: min-content;
  }
`

export const TitleField = styled('input', forwardRef)`
  background: none;
  border: none;
  font-size: 2em;
  font-weight: bold;
  width: 100%;
  outline: none;
  color: var(--text);
`

export const NoteField = styled('textarea', forwardRef)`
  background-color: var(--background);
  color: var(--text);
  /* TODO: fix width issue */
  /* width: 100%; */
  /* min-width: 100%; */
  /* max-width: 100%; */
  min-height: 3em;
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

export const InputContainer = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-block-start: 1em;
  padding-inline-start: 1.5em;
  gap: 1em;
`

export const CloseButtonContainer = styled('button')`
  width: 2em;
  height: 2em;
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
  margin-block-start: .5em;
  margin-inline-end: .5em;

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
export const ModalPanel = styled('div')`
  position: absolute;
  border-radius: .5em;
  background: var(--surface);
  box-sizing: border-box;
  padding: 1.5em 2.5em;
  margin: 2em 1em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% - var(--tabbar-size)));
`

export const ButtonsContainer = styled('div')`
  display: flex;
  gap: 1em;
  justify-content: right;
`


// Item details popup only
export const ImagePreview = styled('img')`
  width: 100%;
  max-width: 40em;
  max-height: 20em;
  object-fit: contain;
  align-self: center;
`