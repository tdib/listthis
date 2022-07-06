import { lazy } from 'react'

export const Login = lazy(() => import('./Auth/Login'))
export const Register = lazy(() => import('./Auth/Register'))
export const ListSelection = lazy(() => import('./ListSelection/ListSelection'))
export const List = lazy(() => import('./List/List'))
export const PageNotFound = lazy(() => import('./PageNotFound/PageNotFound'))

