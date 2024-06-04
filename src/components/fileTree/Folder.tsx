import useEntry from "@/hooks/useEntry";
import { useCallback, useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import TreeEntry from "./TreeEntry";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FolderProps {
    folder: any,
    repoName: string,
    owner: string
}

const Folder = ({ folder, repoName, owner }: FolderProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const { data: entry, isLoading, fetchNow } = useEntry({
        owner, repoName, path: folder.path
    })

    const handleButtonPress = useCallback(() => {
        !entry && fetchNow()
        setIsOpen(prev => !prev)
    }, [])

    return (
        <div>
            <div className='h-7 px-1.5 cursor-default whitespace-nowrap hover:bg-slate-600 flex items-center gap-2' onClick={handleButtonPress}>
                <div className="h-5 w-5 flex justify-center items-center">
                    {isLoading ? <LoadingSpinner className="size-3" /> :
                        ((entry && isOpen) ? <ChevronUp className="size-4"/> : <ChevronDown className="size-4"/>)}
                </div>
                <p className="truncate">
                    {folder.name}
                </p>
            </div>
            {isOpen && entry && (
                <div className="ml-5">
                    {entry.map((item: any, index: number) => (
                        //@ts-ignore
                        <TreeEntry key={index} entry={item} owner={owner} repoName={repoName} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Folder