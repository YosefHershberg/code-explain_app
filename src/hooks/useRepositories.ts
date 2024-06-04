import axiosClient from "@/lib/axiosClient"
import { useQuery } from "react-query"
const VITE_API_URL = import.meta.env.VITE_API_URL

const fetcher = async (topic: string) => {
    const { data } = await axiosClient.get(`${VITE_API_URL}/gettopic`, { params: { topic } })
    return data.items
}

const useRepositories = (topic: string) => {

    const { data, isLoading, error } = useQuery({
        queryFn: () => fetcher(topic),
        queryKey: [topic],
    })

    // const data = useQueries({
    //     //@ts-ignore
    //     queries: ['Javascript', 'Go', 'Python', 'Typescript', 'Java'].map(item => {
    //         return { queryKey: [item], queryFn: () => fetcher(item), staleTime: Infinity }
    //     }),
    // })

    return {
        data, isLoading, error
    }
}

export default useRepositories