import { copyPaste } from './copyPaste'
import { convertToComponent } from './convertToComponent'
import { ungroup } from './ungroup'
import { getNodeIndex } from './getNodeIndex'

/**
 * Makes any selection of nodes a component, the same as it happens in the editor
 * @param {SceneNode} node The node you want to make into a component
 * @returns Returns the new node as a component
 */

export function makeComponent(nodes) {

    let parent = nodes[0].parent
    
    if (nodes.length === 1 && nodes[0].type === "FRAME") {
        let nodeIndex = getNodeIndex(nodes[0])
        let component = convertToComponent(nodes[0])
        parent.insertChild(nodeIndex, component)
        return component
    }
    else {
        let component = figma.createComponent()
        let group = figma.group(nodes, parent)
        component.resizeWithoutConstraints(group.width, group.height)
        copyPaste(group, component, { include: ['x', 'y'] })
        group.x = 0
        group.y = 0
        

        if (nodes.length === 1) {
            component.name = nodes[0].name
        }

        parent.insertChild(getNodeIndex(group), component)
        
        ungroup(group, component)

        return component
    }
}