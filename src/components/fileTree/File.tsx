import { Link } from "react-router-dom"
import { useDrawer } from "@/context/DrawerContextProvider";
import { FileCode2 } from "lucide-react";

interface FileProps {
    file: any,
    owner: string,
    repoName: string
}

const File = ({ file, repoName, owner }: FileProps) => {
    const { closeDrawer } = useDrawer()

    return (
        <Link
            onClick={closeDrawer}
            to={`/repositories/${owner}/${repoName}/${file.path}`}
            className="h-7 px-1.5 cursor-default whitespace-nowrap hover:bg-slate-600 flex items-center gap-2"
        >
            <FileCode2 className="min-h-4 min-w-4 size-4" />
            <p className="truncate">
                {file.name}
            </p>
        </Link>
    )
}

export default File