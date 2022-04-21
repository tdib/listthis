import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useLocation } from 'react-router-dom'

import { Wrapper, Title, LoginForm, InputField, LoginButton, SupportText, Link, ErrorWarning } from './loginPageStyle'
import { useUserStore } from '../../stores'
import { login } from '../../services/users'

export const LoginPage = () => {
  const { register, handleSubmit, watch } = useForm()
  const { loadUser, userID } = useUserStore()
  const [error, setError] = useState()
  const { state } = useLocation()

  const onSubmit = data => {
    login({ username: data.username, password: data.password }).then(res => {
      if (res.isAuthenticated) {
        loadUser({ ...res.result })
      } else {
        setError('Incorrect username or password')
      }
    })
  }

  return userID ? (
    <Navigate to={state?.returnURL ? state.returnURL : '/lists'} />
  ) : (
    <Wrapper>
      <Title>ListThis Login</Title>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        {error && <ErrorWarning>{error}</ErrorWarning>}
        <InputField
          autoFocus={true}
          autoComplete={'off'}
          name={'username'}
          type={'text'}
          required={true}
          placeholder={'Username'}
          {...register('username')}
        ></InputField>
        <InputField
          name={'password'}
          type={'password'}
          required={true}
          placeholder={'Password'}
          {...register('password')}
        ></InputField>
        <div>
          <LoginButton type={'submit'} value={'Log in'} />
          <SupportText>
            Don't have an account? <Link href={'/register'}>Register here!</Link>
          </SupportText>
        </div>
      </LoginForm>
    </Wrapper>
  )
}

export default LoginPage
