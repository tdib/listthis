import styled from 'styled-components'

export const DetailsContainer = styled.div`
  width: 100%;
  height: 30rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`

export const Heading = styled.h1`
  margin: 0;
  font-size: 2rem;
  color: ${p => p.theme.textPrimary};
  font-weight: bolder;
`

export const SubText = styled.span`
  color: ${p => p.theme.quaternary};
`

export const NoteHeading = styled.h2`
  margin: 2rem 0 0 0;
  font-size: 1.5rem;
  color: ${p => p.theme.textPrimary};
  font-weight: bold;
`

export const NoteSection = styled.div`
  color: ${p => p.theme.quaternary};
`

export const DeleteButton = styled.button`
  margin-top: 2rem;
  min-height: 2.5rem;
  color: ${p => p.theme.textPrimary};
  border-radius: 1.5rem;
  border: none;
  box-shadow: 0.25rem 0.25rem 0.25rem 0 #00000044;
  background-color: ${p => p.theme.red};
  transition: transform 0.15s;

  :hover {
    filter: brightness(0.85);
    transform: scale(1.025);
  }

  :active {
    transform: scale(0.95);
  }
`
