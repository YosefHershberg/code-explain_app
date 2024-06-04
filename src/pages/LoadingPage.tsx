import Lottie from "lottie-react";
import loadingAnimation from '@/assets/loading.json'
import { GridBackground } from "@/components/ui/backgrounds/backgound-grid";

const LoadingPage = () => {

    return (
        <div className="absolute top-0 w-screen">
            <GridBackground>
                <div className="h-screen flex flex-col gap-10 justify-center items-center'">
                    <h1 className='text-2xl z-10'>One moment please...</h1>
                    <Lottie className='size-60' animationData={loadingAnimation} />
                </div>
            </GridBackground>
        </div>
    )
}

export default LoadingPage