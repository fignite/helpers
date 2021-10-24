import { isInsideInstance } from './isInsideInstance'
import { getInstanceCounterpartUsingLocation } from './getInstanceCounterpartUsingLocation'
import { getParentInstance } from './getParentInstance'

/**
 * Provides the counterpart component node to the selected instance node. It defaults to using the instance node id to find the matching counterpart node. When this can't be found, it uses `getInstanceCounterpartUsingLocation()`.
 * @param {SceneNode & ChildrenMixin } node A node with children
 * @returns Returns the counterpart component node
 */

export function getInstanceCounterpart(node) {
    // This splits the ide of the selected node and uses the last part which is the id of the counterpart node. Then it finds this in the document.
    if (isInsideInstance(node)) {
        var child = figma.getNodeById(node.id.split(';').slice(-1)[0])

        if (child) {
            return child
        }
        else {
            // console.log(node.name)
            // figma.closePlugin("Does not work with remote components")

            // If can't find node in document (because remote library)

            var parentInstance = getParentInstance(node)
            // var mainComponent = parentInstance.mainComponent

            return getInstanceCounterpartUsingLocation(node)

        }


    }

}