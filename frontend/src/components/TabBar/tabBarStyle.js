import styled from 'styled-components'

export const TabBarContainer = styled.div`
  background-color: ${p => p.theme.secondary};
  width: 100%;
  height: 2.75rem;
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 0;
  box-shadow: 0 -0.25rem 0.5rem 0.25rem #00000020;
`

export const AddButton = styled.button`
  border: none;
  box-shadow: 0 0.25rem 0.25rem #00000044;
  border-radius: 50%;
  background-color: ${p => p.theme.accentPrimary};
  height: 3rem;
  width: 3rem;
  bottom: 1rem;
  position: absolute;

  :hover {
    cursor: pointer;
  }
`
