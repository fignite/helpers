import { copyPaste } from './copyPaste'

// TODO: Change so that it can convert any node to any type?

/**
 * Convert a node to a component
 */

// FIXME: Typescript says detachInstance() doesn't exist on SceneNode & ChildrenMixin 
export function convertToComponent(node: any) {
    const component = figma.createComponent()
    if (node.type === "INSTANCE") {
        node = node.detachInstance()
    }
    component.resizeWithoutConstraints(node.width, node.height)
    for (const child of node.children) {
        component.appendChild(child)
    }
    copyPaste(node, component)
    node.remove()
    return component
}