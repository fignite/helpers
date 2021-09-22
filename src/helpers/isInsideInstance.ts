/**
 * Returns true if the node is nested inside an instance. It does not include the instance itself.
 * @param {SceneNode} node A node you want to check
 * @returns Returns true if inside an instance
 */

export function isInsideInstance(node: SceneNode): boolean {
    const parent = node.parent

    // Sometimes parent is null
    if (parent) {
        if (parent && parent.type === 'INSTANCE') {
            return true
        } else if (parent && parent.type === 'PAGE') {
            return false
        } else {
            return isInsideInstance(parent as SceneNode)
        }
    }
    else {
        return false
    }

}