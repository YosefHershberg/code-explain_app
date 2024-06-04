import useEntry from '@/hooks/useEntry';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TreeEntry from './TreeEntry';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorComp from '../ErrorComp';

interface TreePanelProps {
    owner?: string,
    repoName?: string
}

const TreePanel = ({ owner: ownerProp, repoName: repoNameProp }: TreePanelProps) => {
    const { owner, repoName } = useParams();
    const { data: entry, isLoading, error, fetchNow } = useEntry({
        // @ts-ignore
        owner: ownerProp || owner,
        //@ts-ignore
        repoName: repoNameProp || repoName
    })

    useEffect(() => {
        fetchNow()
    }, [owner, repoName]);

    return (
        <div className="h-[calc(100vh_-_64px)] drop-shadow-md overflow-hidden bg-slate-800 pb-2">
            <div className="p-2 border-b border-gray-700 h-10 flex items-center">
                <h1 className="truncate text-xl font-bold text-gray-50">{repoNameProp || repoName}</h1>
            </div>
            <div className="h-full overflow-auto">
                {isLoading ? (
                    <div className='flex justify-center my-10'>
                        <LoadingSpinner className='h-16 w-16' />
                    </div>
                ) : error ? (<ErrorComp top={true} />) : (
                    entry?.map((item: any, index: number) => (
                        //@ts-ignore
                        <TreeEntry key={index} entry={item} owner={ownerProp || owner} repoName={repoNameProp || repoName} />
                    ))
                )}
            </div>
        </div>
    )
}

export default TreePanel
