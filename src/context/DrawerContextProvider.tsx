import { Drawer, DrawerContent } from '@/components/ui/drawer'
import React, { ReactElement, createContext, useContext, useRef, useState } from 'react'

interface DrawerContextType {
    openDrawer: ({ content }: {
        content: React.ReactElement,
    }) => void,
    closeDrawer: () => void,
}

export const DrawerContext = createContext<DrawerContextType>({
    openDrawer: () => { },
    closeDrawer: () => { },
})

const DrawerContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const contentRef = useRef<ReactElement<any>>()

    const Content = () => contentRef.current

    const openDrawer = ({ content }: {
        content: React.ReactElement
    }) => {
        contentRef.current = content
        setIsOpen(true)
    }

    const closeDrawer = () => setIsOpen(false)

    return (
        <DrawerContext.Provider value={{ openDrawer, closeDrawer }}>
            {children}
            <Drawer open={isOpen}>
                <DrawerContent onFocusOutside={closeDrawer} onDragExit={closeDrawer} onCloseAutoFocus={closeDrawer}>
                    <Content />
                </DrawerContent>
            </Drawer>
        </DrawerContext.Provider>
    )
}

export default DrawerContextProvider

export const useDrawer = () => {
    const { openDrawer, closeDrawer } = useContext<DrawerContextType>(DrawerContext)

    return { openDrawer, closeDrawer }
}