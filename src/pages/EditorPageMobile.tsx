import EditorPanel from '@/components/editorPanel/EditorPanel'
import TreePanel from '@/components/fileTree/TreePanel'
import { Button } from '@/components/ui/button'
import { useDrawer } from '@/context/DrawerContextProvider'
import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditorPageMobile = () => {
    const { openDrawer, closeDrawer } = useDrawer()
    const { owner, repoName } = useParams();

    const handleOpenDrawer = useCallback(() => {
        
        openDrawer({
            content: (
                <div className=''>
                    <TreePanel owner={owner} repoName={repoName} />
                </div>
            )
        })
    }, [])

    useEffect(() => {
        handleOpenDrawer()
    }, []);

    return (
        <div>
            <EditorPanel />
            <Button
                onClick={handleOpenDrawer}
                className='absolute bottom-3 left-3'
                variant='secondary'
            >File Tree</Button>
        </div>
    )
}

export default EditorPageMobile