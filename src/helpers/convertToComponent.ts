import { copyPaste } from './copyPaste'

/**
 * Convert a node to a component
 */

export function convertToComponent(node: SceneNode) {
    const component = figma.createComponent()
    if (node.type === "INSTANCE") {
        node = (node as InstanceNode).detachInstance()
    }
    component.resizeWithoutConstraints(node.width, node.height)
    for (const child of (node as ChildrenMixin).children) {
        component.appendChild(child)
    }
    copyPaste(node, component)
    node.remove()
    return component
}