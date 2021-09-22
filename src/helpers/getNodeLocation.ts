import { getNodeIndex } from './getNodeIndex'

export function getNodeLocation(node, container = figma.currentPage, location = []) {
    if (node && container) {
        if (node.id === container.id) {
            if (location.length > 0) {
                location.push(container)
                // Because nodesIndex have been captured in reverse
                return location.reverse()
            }
            else {
                return false
            }
        }
        else {
            if (node.parent) {
                var nodeIndex = getNodeIndex(node)
                // if (node.parent.layoutMode == "HORIZONTAL" || node.parent.layoutMode === "VERTICAL") {
                // 	nodeIndex = (node.parent.children.length - 1) - getNodeIndex(node)
                // }
                location.push(nodeIndex)
                return getNodeLocation(node.parent, container, location)
            }

        }
    }
    else {
        console.error("Node or container not defined")
        return false
    }
    return false
}