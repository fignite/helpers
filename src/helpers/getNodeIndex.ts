/**
 * Returns the index of a node
 * @param {SceneNode} node A node
 * @returns Selection of node's children
 */

export function getNodeIndex(node: SceneNode): number {
    return node.parent.children.indexOf(node)
}