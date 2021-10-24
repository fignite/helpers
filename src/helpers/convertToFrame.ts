import { copyPaste } from './copyPaste'
import { getNodeIndex } from './getNodeIndex'

/**
 * Converts an instance, component, or rectangle to a frame
 * @param {SceneNode} node The node you want to convert to a frame
 * @returns Returns the new node as a frame
 */

export function convertToFrame(node) {
    let nodeIndex = getNodeIndex(node)
    let parent = node.parent

    if (node.type === "INSTANCE") {
        return node.detachInstance()
    }

    if (node.type === "COMPONENT") {
        let parent = node.parent
        
        // This method preserves plugin data and relaunch data
        let frame = node.createInstance().detachInstance()
        parent.appendChild(frame)
        copyPaste(node, frame, { include: ['x', 'y'] })
        parent.insertChild(nodeIndex, frame)
        node.remove()
        return frame
    }

    if (node.type === "RECTANGLE") {
        let frame = figma.createFrame()
        // FIXME: Add this into copyPaste helper
        frame.resizeWithoutConstraints(node.width, node.height)
        copyPaste(node, frame)
        parent.insertChild(nodeIndex, frame)
        node.remove()
        return frame
    }
}