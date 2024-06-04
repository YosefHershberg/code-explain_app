import { toast } from "@/components/ui/use-toast"
import axiosClient from "@/lib/axiosClient"
import { useCallback, useState } from "react"
import { useQuery } from "react-query"
const VITE_API_URL = import.meta.env.VITE_API_URL

interface Props {
  owner: string,
  repoName: string,
  path?: string
}

const useEntry = ({ owner, repoName, path }: Props) => {
  const [trigger, setTrigger] = useState<boolean>(false)

  const fetcher = useCallback(async () => {
    const { data } = await axiosClient.get(`${VITE_API_URL}/getentry`, { params: { owner, repoName, path } })
    if (Array.isArray(data)) {
      return sortItems(data)
    }
    return data
  }, [owner, repoName, path])

  const fetchNow = useCallback(() => {
    setTrigger(true)
  }, [])

  const { data, isLoading, error } = useQuery({
    queryFn: fetcher,
    queryKey: [`${owner}/${repoName}/${path || ''}`],
    enabled: trigger,
    onSettled: () => setTrigger(false),
    onError: (error) => toast({
      variant: "destructive",
      //@ts-ignore
      title: error.response?.data?.message || "Uh oh! Something went wrong.",
      description: "Try again later",
    }),
  })

  return { data, isLoading, error, fetchNow }
}

function sortItems(items: any[]) {
  return items.sort((a, b) => {
    if (a.type === 'dir' && b.type !== 'dir') {
      return -1;
    }
    if (a.type !== 'dir' && b.type === 'dir') {
      return 1;
    }

    return a.name.localeCompare(b.name);
  });
}


export default useEntry