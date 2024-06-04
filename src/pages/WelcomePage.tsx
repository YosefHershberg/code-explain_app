import { Highlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TracingBeam } from "@/components/ui/backgrounds/tracing-beam";
import { useTheme } from "@/context/ThemeContextProvider";
import { BackgroundBeams } from "@/components/ui/backgrounds/background-beams";

const WelcomePage = () => {

    return (
        <section className="flex flex-col items-center">
            <WelcomePageBackground>
                <div className="dark:absolute relative z-20 h-[calc(100vh_-_64px)] sm:pt-[5rem] top-0 flex flex-col justify-around items-center md:px-10 px-5">
                    <h1 className="text-sky-900 dark:text-slate-200 text-center text-3xl sm:text-5xl lg:text-6xl font-black">Welcome to CodeSplainer!</h1>
                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: [20, -5, 0],
                        }}
                        transition={{
                            duration: 0.5,
                            ease: [0.4, 0.0, 0.2, 1],
                        }}
                        className="max-w-[50rem] text-lg sm:text-xl lg:text-2xl s:px-4 px-1 font-bold text-neutral-700 dark:text-white leading-loose lg:leading-10 text-center mx-auto "
                    >
                        Discover GitHub repos with {" "} <br />
                        <Highlight className="text-black dark:text-white">
                            AI-powered code explanations
                        </Highlight>
                        {" "} to effortlessly learn, understand, and unlock the secrets of programming
                    </motion.h1>
                    <motion.div
                        initial={{ x: '-10vw' }} // Start from outside the viewport on the left
                        animate={{ x: 0 }} // Slide in to position (0)
                    >
                        <Button className="flex gap-2 items-center z-10" asChild>
                            <Link to='/search'>
                                Get started <ArrowRight size={15} />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </WelcomePageBackground>
        </section >
    );
}

const WelcomePageBackground = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useTheme()

    if (theme === 'light') {
        return (
            <>
                <BackgroundBeams />
                <TracingBeam>
                    {children}
                </TracingBeam>
            </>
        )
    } else {
        return (
            <LampContainer>
                <BackgroundBeams />
                {children}
            </LampContainer>
        )
    }
}

export default WelcomePage
