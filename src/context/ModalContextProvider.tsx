import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React, { ReactElement, createContext, useContext, useRef, useState } from 'react'

interface ModalContextType {
    openModal: ({ content }: { content: React.ReactElement }) => void,
    closeModal: () => void
}

const ModalContext = createContext<ModalContextType>({
    openModal: () => { },
    closeModal: () => { }
})

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const contentRef = useRef<ReactElement<any>>()

    const Content = () => contentRef.current

    const openModal = ({ content }: {
        content: React.ReactElement
    }) => {
        contentRef.current = content
        setIsOpen(true)
    }

    const closeModal = () => setIsOpen(false)

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            <Dialog open={isOpen}>
                <DialogContent onInteractOutside={closeModal}>
                    <Content />
                </DialogContent>
            </Dialog>
        </ModalContext.Provider>
    )
}

export default ModalContextProvider


export const useModal = () => {
    const { openModal, closeModal } = useContext<ModalContextType>(ModalContext)

    return { openModal, closeModal }
}