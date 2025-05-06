import { isInsideInstance } from './isInsideInstance'

/**
 * Returns the top most instance that a node belongs to
 * @param {SceneNode} node A node
 * @returns The top most instance node
 */

export function getTopInstance(node) {
    if (node.type === "PAGE") return null
    if (isInsideInstance(node)) {
        if (isInsideInstance(node.parent)) {
            return getTopInstance(node.parent)
        }
        else {
            return node.parent
        }
        
    }
}