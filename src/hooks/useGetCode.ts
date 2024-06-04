import { useEffect, useMemo, useRef, useState } from 'react'
import useHttpClient from './useHttpClient';
import { detectLanguage } from '@/lib/detectLang';
const VITE_API_URL = import.meta.env.VITE_API_URL

interface Props {
    owner: string,
    repoName: string,
    path: string
}

const useGetCode = ({ owner, repoName, path }: Props) => {
    const codeRef = useRef<string>()
    const [isLoadingBase64, setIsLoadingBase64] = useState<Boolean>(false)

    const { data, error, isLoading, triggerHttpReq } = useHttpClient({
        API_URL: `${VITE_API_URL}/getentry`,
        httpMethod: 'GET',
        params: { owner, repoName, path }
    })

    useEffect(() => {
        path && triggerHttpReq()
    }, [path]);

    useEffect(() => {
        const handleBase64Convert = async () => {
            try {
                setIsLoadingBase64(true)
                const res = await decodeBase64Async(data.content)
                codeRef.current = res
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoadingBase64(false)
            }
        }
        if (data) {
            handleBase64Convert()
        }
    }, [data]);

    const language = useMemo(() => data && detectLanguage(data.name), [data])

    return {
        language,
        code: codeRef.current,
        isLoading: (isLoading || isLoadingBase64) ? true : false,
        error
    }
}

export default useGetCode

const decodeBase64Async = (base64String: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const decodedString = atob(base64String);
        resolve(decodedString);
      } catch (error) {
        reject(error);
      }
    });
  }