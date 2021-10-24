import { copyPaste } from './copyPaste'
import { convertToFrame } from './convertToFrame'
import { moveChildren } from './moveChildren'

/**
 * Converts an instance, frame, or rectangle to a component
 * @param {SceneNode} node The node you want to convert to a component
 * @returns Returns the new node as a component
 */

// FIXME: Typescript says detachInstance() doesn't exist on SceneNode & ChildrenMixin 
export function convertToComponent(node: SceneNode & ChildrenMixin) {
    const component = figma.createComponent()

    node = convertToFrame(node)

    // FIXME: Add this into copyPaste helper
    component.resizeWithoutConstraints(node.width, node.height)
    copyPaste(node, component)
    moveChildren(node, component)
    node.remove()
}