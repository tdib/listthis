import { StyledButton } from './buttonStyle'

const Button = ({
  type = 'button',
  secondary,
  ...props
}) => (
  <StyledButton
    type={type}
    $secondary={secondary}
    {...props}
  />
)

export default Button
