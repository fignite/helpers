/**
 * Returns the closet parent instance
 * @param {SceneNode} node An specific node you want to get the parent instance for
 * @returns Returns the parent instance node
 */

export function getParentInstance(node) {
    const parent = node.parent
    if (node.type === "PAGE") return false

    if (parent.type === "INSTANCE") {
        return parent
    } else {
        return getParentInstance(parent)
    }


}