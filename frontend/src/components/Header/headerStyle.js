import styled from 'styled-components'
import { ChevronLeft, Share2 } from 'lucide-react'

export const BackButton = styled(ChevronLeft)`
  position: absolute;
  top: 4rem;
  left: 0.25rem;
  color: ${p => p.theme.tertiary};
  transition: transform 0.1s;

  :hover {
    color: ${p => p.theme.quaternary};
    transform: scale(1.15);
    cursor: pointer;
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
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
  border-bottom: 1.5px solid ${p => p.theme.quaternary};
`

// export const ShareButton = styled(Share2)`
export const ShareButton = styled(Share2)`
  position: absolute;
  top: 4rem;
  right: 2rem;
  color: ${p => (p.disabled ? p.theme.secondary : p.theme.tertiary)};
  transition: transform 0.1s;

  :hover {
    color: ${p => (p.disabled ? null : p.theme.quaternary)};
    transform: ${p => (p.disabled ? null : 'scale(1.15)')};
    cursor: ${p => (p.disabled ? null : 'pointer')};
  }

  :active {
    transform: ${p => (p.disabled ? null : 'scale(0.95)')};
  }
`
