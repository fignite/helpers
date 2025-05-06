import { getParentInstance } from './getParentInstance'
import { getNodeLocation } from './getNodeLocation'
import { getNodeIndex } from './getNodeIndex'
import { getTopInstance } from './getTopInstance'

/**
 * Provides the counterpart component node to the selected instance node. Rather than use the instance node id, it stores the location of the node and then looks for the same node in the main component.
 * @param {SceneNode & ChildrenMixin } node A node with children
 * @returns Returns the counterpart component node
 */

// TODO: Should there be two functions?, one that gets original component, and one that gets prototype 
// Using getTopInstance may return counterpart which has been swapped by the user

export function getInstanceCounterpartUsingLocation(node, parentInstance = getParentInstance(node), location = getNodeLocation(node, parentInstance), parentComponentNode = parentInstance?.mainComponent) {

    if (location) {
        location.shift()

        // console.log(location)

        

        function loopChildren(children, d = 0) {
            for (var i = 0; i < children.length; i++) {
                var child = children[i]
                var nodeIndex = location[d]
                // console.log({ current: getNodeIndex(child), desired: nodeIndex }, child.name)

                if (getNodeIndex(child) === nodeIndex) {
                    // console.log(">>>  ", child.name)
                    
                    // console.log(location.length - 1, d)
                    // If last in array
                    if (location.length - 1 === d) {
                        // console.log({ current: getNodeIndex(child), desired: nodeIndex })
                        return child
                    }
                    else {
                        if (child.children) {
                            // console.log({ current: getNodeIndex(child), desired: nodeIndex })
                            return loopChildren(child.children, d + 1)
                        }
                        // else {
                        //     console.log({ current: getNodeIndex(child), desired: nodeIndex })
                        //     console.log(child)
                        //     // return child
                        // }
                    }

                }

            }

            
        }

        if (parentComponentNode && parentComponentNode.children) {
            return loopChildren(parentComponentNode.children)
        }
        else {
            return node.mainComponent
        }
    }
   
}