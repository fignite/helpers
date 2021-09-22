import { getParentInstance } from './getParentInstance'
import { getNodeLocation } from './getNodeLocation'
import { getNodeIndex } from './getNodeIndex'

export function getInstanceCounterpartUsingLocation(node, parentInstance = getParentInstance(node), location = getNodeLocation(node, parentInstance), parentComponentNode = parentInstance?.mainComponent) {

    location.shift()

    function loopChildren(node, d = 1) {
        var nodeIndex = location[d]

        if (node.children) {
            for (var i = 0; i < node.children.length; i++) {
                var child = node.children[i]

                if (getNodeIndex(child) === nodeIndex) {

                    if (location.length - 1 === d) {
                        return child
                    }
                    else {
                        return loopChildren(child, d + 1)
                    }
                }
            }

        }
        else {
            return node
        }
    }

    if (parentComponentNode && parentComponentNode.children) {
        for (var i = 0; i < parentComponentNode.children.length; i++) {
            var componentNode = parentComponentNode.children[i]

            var nodeIndex = location[0]
            if (getNodeIndex(componentNode) === nodeIndex) {
                if (location.length - 1 === 0) {
                    return componentNode
                }
                else {
                    return loopChildren(componentNode)
                }

            }
        }
    }
    else {
        return node.mainComponent
    }
}