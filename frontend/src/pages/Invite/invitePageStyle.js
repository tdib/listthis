import styled from 'styled-components'

export const Container = styled.div`
  color: ${p => p.theme.textPrimary};
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
`

export const Title = styled.h1`
  margin: 0;
`

export const Subtitle = styled.h2`
  color: ${p => p.theme.textPrimary};
`

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 2rem;
`

export const Button = styled.button`
  background-color: ${p => p.theme.accentPrimary};
  border: none;
  height: 3rem;
  width: 13rem;
  border-radius: 1.5rem;
  color: ${p => p.theme.textPrimary};

  box-shadow: 0.25rem 0.25rem 0.5rem 0 #00000020;
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
