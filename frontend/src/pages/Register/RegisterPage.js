import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import {
  Wrapper,
  Title,
  RegisterForm,
  InputField,
  RegisterButton,
  SupportText,
  Link,
  ErrorWarning,
} from './registerPageStyle'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'

import { useUserStore } from '../../stores'
import { login, signup } from '../../services/users'

export const RegisterPage = () => {
  const { register, handleSubmit } = useForm()
  const { userID, loadUser } = useUserStore()
  const newUserID = uuid()
  const navigate = useNavigate()
  const [error, setError] = useState()
  const { state } = useLocation()

  const onSubmit = data => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords don't match.")
    } else {
      const username = data.username
      const password = data.password
      signup({ userID: newUserID, username, password })
        .then(res => {
          if (res === null) {
            throw new Error('Username already exists!')
          } else {
            return login({ userID: newUserID, username, password })
          }
        })
        .then(res => {
          loadUser({ ...res.result })
        })
        .then(() => navigate(state.returnURL ?? '/lists'))
        .catch(err => {
          setError(err?.message ?? err)
        })
    }
  }

  return userID ? (
    <Navigate to={'/lists'} />
  ) : (
    <Wrapper>
      <Title>ListThis Registration</Title>
      <RegisterForm onSubmit={handleSubmit(onSubmit)}>
        {error && <ErrorWarning>{error}</ErrorWarning>}
        <InputField
          autoFocus={true}
          autoComplete={'off'}
          name={'username'}
          type={'text'}
          required={true}
          placeholder={'JohnDoe123'}
          {...register('username')}
        />
        <InputField
          name={'password'}
          type={'password'}
          required={true}
          minLength={4}
          placeholder={'Type a password'}
          {...register('password')}
        />
        <InputField
          name={'confirmPassword'}
          type={'password'}
          required={true}
          placeholder={'Confirm your password'}
          {...register('confirmPassword')}
        />
        <div>
          <RegisterButton type={'submit'} value={'Register'} />
          <SupportText>
            Already have an account?{' '}
            <Link
              href={'/login'}
              onClick={() =>
                navigate('/login', { state: { returnURL: state?.returnURL ? state.returnURL : '/login' } })
              }
            >
              Log in
            </Link>
          </SupportText>
        </div>
      </RegisterForm>
    </Wrapper>
  )
}

export default RegisterPage
