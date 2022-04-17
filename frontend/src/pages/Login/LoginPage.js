import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, Navigate } from 'react-router-dom'

import { GoogleLogin } from 'react-google-login'

import { Wrapper, Title, LoginForm, InputField, LoginButton } from './loginPageStyle'
import { useUserStore } from '../../stores'
import api from '../../services'
import { getGoogleClientID } from '../../services/google'
import { login } from '../../services/users'

// const loadUser = useUserStore(s => s.loadUser)
// loadUser({
//   userID: 'thisisauserid',
//   username: 'Dib',
//   associatedListIDs: ['list1id', 'list2id', 'list3id'],
//   firstName: 'Thomas',
//   lastName: 'Dib',
//   isLoggedIn: true,
// })

export const LoginPage = () => {
  const { register, handleSubmit, watch } = useForm()
  const { loadUser, userID } = useUserStore()

  const onSubmit = data => {
    login({ username: data.username, password: data.password }).then(res => {
      console.log(res)
      if (res.isAuthenticated) {
        console.log('Logging in!')
        loadUser({ ...res.result })
      } else {
        console.log('Incorrect username or password!')
      }
    })
  }

  const handleFailure = result => {
    console.error(result)
  }

  const handleLogin = googleData => {
    console.log(googleData)
  }

  return userID ? (
    <Navigate to={'/lists'} />
  ) : (
    <Wrapper>
      <Title>ListThis Login</Title>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <InputField
          autoFocus={true}
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
        {/* <Link to='/'> */}
        <LoginButton type={'submit'} value={'Log in'} />
        {/* Log in
        </LoginButton> */}
        {/* </Link> */}
        {/* <GoogleLogin
          clientId={'560451453242-j7321c0s94sp14171gej4gsm9covjn2k.apps.googleusercontent.com'}
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={'single_host_origin'}
        /> */}
      </LoginForm>
    </Wrapper>
  )
}

export default LoginPage
