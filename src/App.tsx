import { lazy } from 'react'
import { Outlet, Routes, Route } from 'react-router-dom'
import Navbar from '@/components/nav/Navbar'
import WelcomePage from '@/pages/WelcomePage'
import ProtectedRoutes from '@/components/ProtectedRoutes'

const EditerPage = lazy(() => import('@/pages/EditerPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const Home = lazy(() => import('@/pages/Home'))
const SignupPage = lazy(() => import('@/pages/SignupPage'))
const SigninPage = lazy(() => import('@/pages/SigninPage'))

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<WelcomePage />} />
        <Route path='sign-up/*' element={<SignupPage />} />
        <Route path="sign-in/*" element={<SigninPage />} />

        <Route element={<ProtectedRoutes />}>
          <Route path='search' element={<Home />} />
          <Route path='repositories/:owner/:repoName/*' element={<EditerPage />} />
        </Route>
      </Route>
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App

const AppLayout = () => {

  return (
    <main className='overflow-y-hidden'>
      <Navbar />
      <div className='mt-16'>
        {/* TODO: check if can use flex-grow here instead  */}
        <Outlet />
      </div>
    </main>
  )
}
