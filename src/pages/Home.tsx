import Searchbar from "@/components/Searchbar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import useRepositories from "@/hooks/useRepositories"
import { useMemo } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContextProvider';
import GlobeDemo from '@/components/GlobeDemo'
import { TracingBeam } from "@/components/ui/backgrounds/tracing-beam"
import { BackgroundGradient } from "@/components/ui/backgrounds/background-gradient"
import { GridBackground } from "@/components/ui/backgrounds/backgound-grid"

const Home = () => {
    const { theme } = useTheme()

    const javascriptData = useRepositories('Javascript')
    const rustData = useRepositories('Rust')
    const pythonData = useRepositories('Python')
    const typescriptData = useRepositories('Typescript')
    const javaData = useRepositories('Java')

    const languageArr = useMemo(() => ['Javascript', 'Rust', 'Python', 'Typescript', 'Java'], [])

    const dataArr = useMemo(() => ([
        javascriptData,
        rustData,
        pythonData,
        typescriptData,
        javaData
    ]), [
        javascriptData,
        rustData,
        pythonData,
        typescriptData,
        javaData
    ])

    return (
        <GridBackground>
            <TracingBeam>
                <div className="flex-col items-center md:h-[40rem] h-fit p-2 z-0 flex justify-start sm:justify-center pt-6">
                    <motion.div
                        initial={{ opacity: 0.0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="relative flex flex-col gap-5 items-center justify-center px-4"
                    >
                        <h1 className='text-sky-900 dark:text-slate-200 md:text-6xl sm:text-4xl text-3xl font-extrabold text-center'>Welcome to CodeExlplianer!</h1>
                        <p className="text-sky-900 dark:text-slate-200 sm:text-lg text-md text-center">Get a readable explanation of any code snippet from any Github Repository in seconds.</p>
                        <Searchbar />
                    </motion.div>
                    <div className="sm:size-[20rem] size-[15rem] aspect-square">
                        <GlobeDemo />
                    </div>
                </div>
                {!(theme === 'light') ? (
                    <section className="bg-slate-900 flex flex-col min-h-[80rem] items-center p-7">
                        <h1 className="text-2xl text-slate-200 sm:text-4xl font-bold mb-8">Popular Repositories</h1>
                        <div className="flex md:flex-row flex-col gap-5 w-[60rem] flex-wrap justify-center items-center">
                            {dataArr?.map((language, index) => (language.isLoading ?
                                <Skeleton key={index} className="lg:w-[25rem] sm:w-[22rem] w-[20rem] mx-2" />
                                : <Card key={index} className="lg:w-[25rem] sm:w-[22rem] w-[20rem] mx-2">
                                    <CardHeader>
                                        <CardTitle className="my-1">{languageArr[index]}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col items-start">
                                        {language.data.map((item: any, index: number) => (
                                            <Link key={index} to={`/repositories/${item.full_name}`}>
                                                <Button variant='link' className="p-0 h-[2rem] text-blue-900">{item.full_name}</Button>
                                            </Link>
                                        ))}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                ) : (
                    <BackgroundGradient className="flex flex-col min-h-[80rem] items-center p-7" animate={false}>
                        <h1 className="text-2xl sm:text-4xl font-bold mb-8">Popular Repositories</h1>
                        <div className="flex md:flex-row flex-col gap-5 w-[60rem] flex-wrap justify-center items-center">
                            {dataArr.map((language, index) => (language.isLoading ?
                                <Skeleton key={index} className="lg:w-[25rem] sm:w-[22rem] w-[20rem] mx-2" />
                                : <Card key={index} className="lg:w-[25rem] sm:w-[22rem] w-[20rem] mx-2">
                                    <CardHeader>
                                        <CardTitle className="my-1">{languageArr[index]}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col items-start">
                                        {language.data.map((item: any, index: number) => (
                                            <Link key={index} to={`/repositories/${item.full_name}`}>
                                                <Button variant='link' className="p-0 h-[2rem] text-blue-900">{item.full_name}</Button>
                                            </Link>
                                        ))}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </BackgroundGradient>
                )}
            </TracingBeam>
        </GridBackground>
    )
}

export default Home