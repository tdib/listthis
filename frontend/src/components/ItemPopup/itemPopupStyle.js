import styled from 'styled-components'
import { X } from 'lucide-react'

export const PanelWrapper = styled.div`
  pointer-events: ${p => (p.dimBackground ? 'initial' : 'none')};
  top: 0;
  left: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${p => (p.dimBackground ? '#00000055' : 'none')};
  transition: background-color 0.5s;
`

export const Panel = styled.div`
  height: ${p => (p.isOpen ? '60%' : '0')};
  display: flex;

  // Allow scrolling but disable scroll bar
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }

  left: 0;
  bottom: 0;
  justify-content: left;
  position: fixed;
  width: 100%;
  background-color: ${p => p.theme.secondary};
  z-index: 1;
  border-radius: 1rem;
  transition: height 0.4s ease;
`

export const AddItemForm = styled.form`
  height: 30rem;
  width: 100%;
  margin: 1.5rem 0 0 1.5rem;
`

export const TitleField = styled.input`
  width: 100%;
  height: 2.5rem;
  background: none;
  border: none;
  color: ${p => p.theme.textPrimary};
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;

  ::placeholder {
    color: ${p => p.theme.tertiary};
  }

  :focus {
    outline-width: 0;
  }
`

export const NoteHeading = styled.label`
  user-select: none;
  font-size: 1rem;
  color: ${p => p.theme.textPrimary};
`

export const NoteSection = styled.textarea`
  background: none;
  border: none;
  resize: none;
  width: 100%;
  height: 20rem;
  color: ${p => p.theme.textPrimary};
  font-family: 'Franklin Gothic Light', 'Arial Narrow', Arial, sans-serif;

  :focus {
    outline-width: 0;
  }
`

export const SaveButton = styled.input`
  width: 10rem;
  height: 3rem;
  border-radius: 1.5rem;
  background-color: ${p => p.theme.accentPrimary};
  border: none;
  box-shadow: 0.25rem 0.25rem 0.5rem 0 #00000070;
  color: ${p => p.theme.textPrimary};
  font-size: 1.1rem;
  font-weight: bold;
  transition: transform 0.1s;

  :disabled {
    filter: brightness(0.85);
    :hover {
      cursor: not-allowed;
      transform: scale(1);
    }
  }

  :hover {
    filter: brightness(0.85);
    cursor: pointer;
    transform: scale(1.025);
  }

  :active {
    transform: scale(0.95);
  }
`

export const XIcon = styled(X)`
  color: ${p => p.theme.textPrimary};
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  opacity: ${p => (p.doDisplay ? '100%' : '0%')};
  margin: 0.5rem;
  height: fit-content;

  :hover {
    cursor: pointer;
    filter: brightness(85%);
  }
`
