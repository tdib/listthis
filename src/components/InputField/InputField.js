import { styled } from 'goober'
import { forwardRef } from 'react'

const InputField = styled('input', forwardRef)`
  padding: 0;
  width: 100%;
  border-radius: 0.25rem;
  height: 2em;
  border: none;
  text-indent: 0.5rem;
  background: var(--background);
  color: var(--text);

  &:focus {
    outline: solid;
    outline-color: var(--brand);
  }
`

export default InputField