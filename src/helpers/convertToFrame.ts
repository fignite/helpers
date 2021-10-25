import { copyPaste } from './copyPaste'

/**
 * Converts an instance, component, or rectangle to a frame
 * @param {SceneNode} node The node you want to convert to a frame
 * @returns Returns the new node as a frame
 */

export function convertToFrame(node) {

    if (node.type === "INSTANCE") {
        return node.detachInstance()
    }

    if (node.type === "COMPONENT") {
        let parent = node.parent
        
        // This method preserves plugin data and relaunch data
        console.log("hello")
        let frame = node.createInstance().detachInstance()
        parent.appendChild(frame)
        copyPaste(node, frame, { include: ['x', 'y'] })

        // Treat like native method
        figma.currentPage.appendChild(frame)
        node.remove()
        return frame
    }

    if (node.type === "RECTANGLE" || node.type === "GROUP") {
        let frame = figma.createFrame()

        // FIXME: Add this into copyPaste helper
        frame.resizeWithoutConstraints(node.width, node.height)
        copyPaste(node, frame)
        
        node.remove()
        return frame
    }

    if (node.type === "FRAME") {
        // Don't do anything to it if it's a frame
        return node
    }
}