import { copyPaste } from './copyPaste'
import { convertToFrame } from './convertToFrame'
import { moveChildren } from './moveChildren'
import { getNodeIndex } from './getNodeIndex'

/**
 * Converts an instance, frame, or rectangle to a component
 * @param {SceneNode} node The node you want to convert to a component
 * @returns Returns the new node as a component
 */

// FIXME: Typescript says detachInstance() doesn't exist on SceneNode & ChildrenMixin 
export function convertToComponent(node) {
    const component = figma.createComponent()
    let parent = node.parent
    let nodeIndex = getNodeIndex(node)

    node = convertToFrame(node)

    // FIXME: Add this into copyPaste helper
    component.resizeWithoutConstraints(node.width, node.height)
    copyPaste(node, component)
    moveChildren(node, component)
    parent.insertChild(nodeIndex, component)
    node.remove()
    return component
}