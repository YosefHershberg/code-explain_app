import { useUser } from '@clerk/clerk-react'
import { Outlet, Navigate } from 'react-router-dom'
// import SuspenseTrigger from './SuspenseTrigger'
import LoadingPage from '@/pages/LoadingPage'

const ProtectedRoutes = () => {
    const { isLoaded, isSignedIn } = useUser()

    if (isLoaded) {
        if (isSignedIn) {
            return <Outlet />
        } else {
            return <Navigate to='sign-up' />
        }
    } else {
        // return <SuspenseTrigger />
        return <LoadingPage />
    }
}

export default ProtectedRoutes
