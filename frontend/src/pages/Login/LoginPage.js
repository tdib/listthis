import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { Wrapper, Title, LoginForm, InputField, LoginButton } from './loginPageStyle'
import { useUserStore } from '../../stores'

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
  const navigate = useNavigate()
  const onSubmit = () => {
    // TODO: implement logging in
    // validate credentials
    navigate('/')
  }

  return (
    <Wrapper>
      <Title>ListThis Login</Title>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <InputField
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
        <LoginButton type={'submit'} />
        {/* Log in
        </LoginButton> */}
        {/* </Link> */}
      </LoginForm>
    </Wrapper>
  )
}

export default LoginPage
