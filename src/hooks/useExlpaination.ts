import { useEffect } from "react";
import useHttpClient from "./useHttpClient"
import { toast } from "@/components/ui/use-toast";
const VITE_API_URL = import.meta.env.VITE_API_URL

const useExlpaination = (text: string) => {

    const { data, isLoading, error, triggerHttpReq } = useHttpClient({
        API_URL: `${VITE_API_URL}/explain`,
        httpMethod: 'POST',
        body: { text },
    })

    useEffect(() => {
        if (error) {
            toast({
                variant: "destructive",
                //@ts-ignore
                title: error.response?.data?.message || "Uh oh! Something went wrong.",
                description: "Try again later",
            })
        }
    }, [error]);

    return {
        data: data?.message.content, isLoading, error, triggerExlainationReq: triggerHttpReq
    }
}

export default useExlpaination