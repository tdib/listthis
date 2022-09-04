import { StyledButton } from './buttonStyle'

const Button = ({ type = 'button', secondary, warning, icon, children, ...props }) => (
  <StyledButton type={type} $secondary={secondary} $warning={warning} {...props}>
    {icon}
    {children}
  </StyledButton>
)

export default Button
