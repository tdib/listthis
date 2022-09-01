import { styled } from 'goober'

export const StyledButton = styled('button')`
  display: flex;
  gap: .5em;
  align-items: center;
  justify-content: center;
  padding: .5em .75em;
  background: ${p => p.$warning ? 'var(--error)' : p.$secondary ? 'var(--background)' : 'var(--brand)'};
  border: none;
  border-radius: .4rem;
  font-weight: 600;
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
