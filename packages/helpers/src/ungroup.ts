/**
 * Mimics similar behaviour to ungrouping nodes in editor.
 * @param {SceneNode & ChildrenMixin } node A node with children
 * @param parent Target container to append ungrouped nodes to
 * @returns Selection of node's children
 */

export function ungroup(node: SceneNode & ChildrenMixin, parent: SceneNode & ChildrenMixin | PageNode) {
    let selection: SceneNode[] = []
    let children = node.children

    for (let i = 0; i < children.length; i++) {
        parent.appendChild(children[i])
        selection.push(children[i])
    }

    // Doesn't need removing if it's a group node
    if (node.type !== "GROUP") {
        node.remove()
    }
    
    return selection
}