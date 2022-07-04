import { SpinnerContainer, OuterCircle, InnerCircle, CutSquare } from './spinnerStyle'

const Spinner = () => {
  return <SpinnerContainer>
    <OuterCircle>
      <InnerCircle>
        <CutSquare></CutSquare>
      </InnerCircle>
    </OuterCircle>
  </SpinnerContainer>
}

export default Spinner