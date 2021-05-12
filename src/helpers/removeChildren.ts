/**
 * Convinient way to delete children of a node
 * @param {SceneNode & ChildrenMixin } node A node with children
 */

export function removeChildren(node: SceneNode & ChildrenMixin) {

    var length = node.children.length

    if (length > 0) {
        for (let i = 0; i < length; i++) {
            node.children[0].remove()
        }
    }

}