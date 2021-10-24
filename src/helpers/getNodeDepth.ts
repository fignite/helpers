/**
 * Returns the depth of a node relative to its container
 * @param {SceneNode} node A node
 * @returns An integer which represents the depth
 */

export function getNodeDepth(node, container = figma.currentPage, depth = 0): number {
    if (node) {
        if (node.id === container.id) {
            return depth
        }
        else {
            depth += 1
            return getNodeDepth(node.parent, container, depth)
        }
    }
}