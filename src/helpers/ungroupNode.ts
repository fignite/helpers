export function ungroupNode(node, parent) {
    let selection = []
    let children = node.children

    for (let i = 0; i < children.length; i++) {
        parent.appendChild(children[i])
        selection.push(children[i])
    }

    node.remove()

    return selection
}