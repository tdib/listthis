import { styled } from 'goober'

export const StyledButton = styled('button')`
  padding: .5em .75em;
  background: ${p => p.$secondary ? 'var(--background)' : 'var(--brand)'};
  border: none;
  border-radius: .4rem;
  /* TODO: lower weight */
  font-weight: bold;
  color: white;
  transition: transform .075s ease;
  text-decoration: none;
  cursor: pointer;

  &:active {
    transform: scale(0.975);
  }

  &:disabled {
    background: var(--disabled-button);
    transform: scale(1);
    cursor: not-allowed;
  }
`
