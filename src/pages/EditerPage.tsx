import EditorPanel from "@/components/editorPanel/EditorPanel"
import TreePanel from "@/components/fileTree/TreePanel"
import Split from "react-split"
import EditorPanelMobile from './EditorPageMobile'
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";

const EditerPage = () => {
    const isSmallScreen = useIsMobile()

    if (isSmallScreen) {
        return <EditorPanelMobile />
    }

    return (
        <motion.section
            initial={{ opacity: 0 }} // Initial state (scaled down)
            animate={{ opacity: 1 }} // Final state (actual size)
            transition={{ duration: 0.3 }} // Transition duration
        >
            <Split
                sizes={[20, 80]}
                gutterSize={4}
                direction="horizontal"
                cursor="col-resize"
                className="flex flex-row"
            >
                <div>
                    <TreePanel />
                </div>
                <div>
                    <EditorPanel />
                </div>
            </Split>
        </motion.section>
    )
}

export default EditerPage
