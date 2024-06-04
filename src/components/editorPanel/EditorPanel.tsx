import { useParams } from "react-router-dom"
import Breadcrumbs from "./Breadcrumbs";
import { memo, useEffect, useLayoutEffect, useState } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import useGetCode from "@/hooks/useGetCode";
import useExlpaination from "@/hooks/useExlpaination";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import ErrorComp from "../ErrorComp";
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";

const EditorPanel = () => {
  const { '*': path, owner, repoName } = useParams();
  const [hasSelectedText, setHasSelectedText] = useState<Boolean>(false)
  const [selectedtext, setSelectedText] = useState<string | null>()
  const [displayedText, setDisplayedText] = useState<string>('')

  const isSmallScreen = useIsMobile()

  //@ts-ignore
  const { code, isLoading: isLoadingCode, error: errorCode, language } = useGetCode({ path, owner, repoName })

  const { data: explaination, isLoading: isLoadingExplaination, error: errorExlaination, triggerExlainationReq } = useExlpaination(selectedtext || '')

  useEffect(() => {
    const handleTextSelect = () => {
      const selection = window.getSelection()?.toString();
      setSelectedText(selection);
      setHasSelectedText(!!selection);
    };

    document.addEventListener('mouseup', handleTextSelect);

    return () => {
      document.removeEventListener('mouseup', handleTextSelect);
    }
  }, []);

  useEffect(() => {
    setDisplayedText('')
  }, [owner, repoName]);

  useLayoutEffect(() => {
    code && setDisplayedText(code)
  }, [code]);

  const handleExplainBtnPressed = () => {
    if (code) triggerExlainationReq()
  }

  return (
    <div className="bg-stone-900 h-[calc(100vh_-_64px)] flex flex-col relative">
      <Dialog>
        {/* @ts-ignore */}
        <Breadcrumbs path={path} />
        {isLoadingCode ? (
          <div className="flex-1 w-full flex justify-center items-center">
            <LoadingSpinner className="h-20 w-20" />
          </div>
        ) : errorCode ? (
          <ErrorComp />
        ) : (displayedText ?
          <>
            {/* @ts-ignore */}
            <SyntaxHighlighter language={language} style={atomOneDark} className='flex-1 overflow-y-auto'>
              {displayedText}
            </SyntaxHighlighter>

            {hasSelectedText &&
              <motion.div
                className={isSmallScreen ? "absolute bottom-3 right-3" : "absolute bottom-6 right-6"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <DialogTrigger asChild>
                  <Button
                    className={cn(isSmallScreen ? '' : "h-14 w-24 rounded-full")}
                    onClick={handleExplainBtnPressed}
                    variant='secondary'
                  >
                    Explain
                  </Button>
                </DialogTrigger>
              </motion.div>
            }
          </> :
          <div className="flex w-full h-full items-center justify-center">
            <h1 className="text-xl text-white">Waiting for you too choose a file..</h1>
          </div>
        )
        }
        <DialogContent className={isSmallScreen ? "max-w-[20rem]" : ''}>
          {isLoadingExplaination ? (
            <div className="flex justify-center items-center">
              <LoadingSpinner className="h-20 w-20" />
            </div>
          ) : errorExlaination ? (<ErrorComp darkColor={true} top={true} />) : (
            <div className="flex flex-col items-center gap-3">
              <h1 className="text-xl font-bold">Explanation</h1>
              <p>{explaination}</p>
              <DialogFooter>
                <DialogTrigger asChild>
                  <Button variant='default'>Close</Button>
                </DialogTrigger>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div >
  )
}

export default memo(EditorPanel)