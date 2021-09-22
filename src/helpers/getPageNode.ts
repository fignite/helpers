/**
 * Returns the page node of the selected node
 * @param {SceneNode} node A node
 * @returns The page node
 */

export function getPageNode(node) {
    if (node.parent.type === "PAGE") {
        return node.parent
    }
    else {
        return getPageNode(node.parent)
    }
}