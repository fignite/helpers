import { isInsideInstance } from './isInsideInstance'

/**
 * Returns the closest parent which isn't a group
 * @param {SceneNode} node A node
 * @returns Returns a node
 */

export function getNoneGroupParent(node) {
    if (node.parent?.type === "BOOLEAN_OPERATION"
        || node.parent?.type === "COMPONENT_SET"
        || node.parent?.type === "GROUP") {
        return getNoneGroupParent(node.parent)
    }
    else {
        return node.parent
    }

}