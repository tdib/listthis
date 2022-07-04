import { forwardRef } from 'react'
import { InputFieldStyle } from './inputFieldStyle'

const InputField = forwardRef(({ ...props }, ref) => {
  return <InputFieldStyle {...props} ref={ref} />
})

export default InputField