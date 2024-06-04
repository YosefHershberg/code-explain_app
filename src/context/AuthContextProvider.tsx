import { createContext, useContext } from "react";
import { useUser } from "@clerk/clerk-react";

interface AuthContextType {
    user: any,
    isSignedIn: any,
    isLoaded: any
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isSignedIn: false,
    isLoaded: false
})

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { user, isSignedIn, isLoaded } = useUser()

    return (
        <AuthContext.Provider value={{ user, isLoaded, isSignedIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const authData = useContext(AuthContext)

    return authData
}