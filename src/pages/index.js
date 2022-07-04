import { lazy } from 'react'

export const Home = lazy(() => import('./Home/Home'))
export const Login = lazy(() => import('./Login/Login'))
export const Register = lazy(() => import('./Register/Register'))
export const ListSelection = lazy(() => import('./ListSelection/ListSelection'))
export const List = lazy(() => import('./List/List'))
export const PageNotFound = lazy(() => import('./PageNotFound/PageNotFound'))

