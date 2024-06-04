import { lazy } from "react";
import { SignUp } from "@clerk/clerk-react";
// import { GridBackground } from "@/components/ui/backgrounds/backgound-grid";
const Boxes = lazy(() => import("@/components/ui/backgrounds/background-boxes"))

const SignupPage = () => {

    return (
        // <GridBackground>
        <div className="min-h-[calc(100vh_-_64px)] relative w-full overflow-hidden flex flex-col items-center justify-center p-5">
            <Boxes />
            <SignUp
                redirectUrl='/search'
                routing="path"
                path="/sign-up"
                signInUrl='sign-in'
            />
        </div>
        // </GridBackground>
    );
}

export default SignupPage
