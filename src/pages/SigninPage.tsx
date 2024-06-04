import { lazy } from "react";
import { SignIn } from "@clerk/clerk-react";
// import { GridBackground } from "@/components/ui/backgrounds/backgound-grid";
const Boxes = lazy(() => import("@/components/ui/backgrounds/background-boxes"))

const SigninPage = () => {

    return (
        // <GridBackground>
        <div className="min-h-[calc(100vh_-_64px)] relative w-full overflow-hidden flex flex-col items-center justify-center">
            <Boxes />
            <SignIn
                redirectUrl='/search'
                routing="path"
                path="/sign-in"
                signUpUrl='sign-up'
            />
        </div>
        // </GridBackground>
    );
}

export default SigninPage
