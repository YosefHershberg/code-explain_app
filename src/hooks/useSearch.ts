import { useEffect } from "react";
import useHttpClient from "./useHttpClient"
import { toast } from "@/components/ui/use-toast";
const VITE_API_URL = import.meta.env.VITE_API_URL

const useSearch = (searchQuery: string) => {
  
  const { data: results, isLoading, error, triggerHttpReq: triggerSearch } = useHttpClient({
    API_URL: `${VITE_API_URL}/search`,
    httpMethod: 'GET',
    params: { query: searchQuery }
  })

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        //@ts-ignore
        title: error.response?.data?.message || "Uh oh! Something went wrong.",
        description: "Try again later",
        // action: <Button variant='ghost' onClick={handleSubmit}>Try again</Button>,
      })
    }
  }, [error]);


  return {
    results, isLoading, error, triggerSearch
  }
}

export default useSearch