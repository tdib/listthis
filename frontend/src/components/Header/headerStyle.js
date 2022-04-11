import styled from 'styled-components'
import { ChevronLeft } from 'lucide-react'

export const BackButton = styled(ChevronLeft)`
  position: absolute;
  top: 4rem;
  left: 0.25rem;
  color: ${p => p.theme.tertiary};
  transition: transform 0.1s;

  :hover {
    color: ${p => p.theme.quaternary};
    transform: scale(1.15);
  }

  :active {
    transform: scale(0.95);
  }
`

export const HeaderContainer = styled.div`
  margin: 2rem;
`

export const Title = styled.h1`
  color: ${p => p.theme.textPrimary};
  margin: 0;
`

export const Subtitle = styled.span`
  color: ${p => p.theme.quaternary};
`

export const HRule = styled.hr`
  border-color: ${p => p.theme.quaternary};
`
