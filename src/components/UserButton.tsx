import { useUser, useAuth } from '@clerk/clerk-react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './ui/LoadingSpinner';

const UserButton = () => {
    const { user, isSignedIn } = useUser()
    const { signOut, isLoaded } = useAuth()
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOut()
        navigate('/')
    }

    if (!isLoaded) {
        return <LoadingSpinner className='border-e-black dark:border-e-white size-7'/>
    }

    if (!isSignedIn) {
        return null
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>{user?.firstName?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className='flex justify-between items-center'
                    onClick={handleSignOut}
                >
                    Sign out
                    <LogOut className='size-4'/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton