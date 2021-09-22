export function getNodeIndex(node: SceneNode): number {
    return node.parent.children.indexOf(node)
}