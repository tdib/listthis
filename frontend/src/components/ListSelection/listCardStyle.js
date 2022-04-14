import styled from 'styled-components'
import { X } from 'lucide-react'

export const CardContainer = styled.div`
  display: flex;
  width: 12rem;
  height: 12rem;
  border-radius: 1rem;
  background-color: ${p => p.theme.secondary};
  // min width

  :hover {
    filter: brightness(1.15);
    cursor: pointer;
  }
`

export const ListName = styled.p`
  margin: 1rem;
  font-weight: 500;
  font-size: 1.5rem;
  color: ${p => p.theme.textPrimary};
  overflow: hidden;
  overflow-wrap: break-word;
  user-select: none;
  flex: 1;
`

export const LeaveListButton = styled(X)`
  color: ${p => p.theme.tertiary};
  padding: 0.25rem;

  :hover {
    color: ${p => p.theme.quaternary};
  }
`