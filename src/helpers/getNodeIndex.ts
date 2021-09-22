/**
 * Returns the index of a node
 * @param {SceneNode} node A node
 * @returns The index of the node
 */

export function getNodeIndex(node: SceneNode): number {
    return node.parent.children.indexOf(node)
}