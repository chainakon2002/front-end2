import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import LoginForm from '../layout/LoginForm'
import RegisterForm from '../layout/RegisterForm'
import useAuth from '../hooks/useAuth'
import Header from '../layout/Header'
import UserHome from '../layout/UserHome'
import NewTodoForm from '../layout/NewTodoForm'
import Cart from '../layout/cart'

import ProductDetail from '../layout/OrderDate/getProductById'; // เพิ่ม import
import Payment from '../layout/pay/Payment';
import Admin from '../layout/adminpage/adminhome'
import Adminproduct from '../layout/adminpage/adminproduct'
import Adminorder from '../layout/adminpage/adminorder'
import Productpict from '../layout/Productpict'
const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children: [
      { index: true, element: <LoginForm /> },
      { path: '/register', element: <RegisterForm />}
    ]
  }
])

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children : [
      { index: true, element: <UserHome /> },
      { path: '/new', element: <NewTodoForm />},
      { path: '/cart', element: <Cart />},
      { path: '/new', element: <product /> },
      { path: '/product/:id', element: <ProductDetail /> },
      { path: '/payment/:id/Fs2224SbaRel2Ncvn123444Bncceddd101Mx12Z01', element: <Payment/> },
      { path: '/product01/', element: <Productpict /> }

    ]
  }
])

const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children : [
      { index: true, element: <Admin /> },
      { path: '/Add', element: <Adminproduct />},
      { path: '/home', element: <Admin />},
      { path: '/order', element: <Adminorder />}



    ]
  }
])

export default function AppRouter() {
  const {user} = useAuth()
  // const finalRouter = user?.id ? userRouter : guestRouter
  const finalRouter = user?.id ? user?.role === 'ADMIN' ? adminRouter : userRouter : guestRouter;
  return (
    <RouterProvider router={finalRouter} />
  )
}
