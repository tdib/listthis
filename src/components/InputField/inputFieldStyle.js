import { styled } from 'goober'
import { forwardRef } from 'react'

export const InputFieldStyle = styled('input', forwardRef)`
  padding: 0;
  width: 100%;
  border-radius: 0.25rem;
  height: 2em;
  border: none;
  text-indent: 0.5rem;
  background: var(--white);
  color: var(--black);

  &:focus {
    outline: solid;
    outline-color: var(--brand);
  }
`