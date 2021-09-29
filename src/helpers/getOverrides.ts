import { getInstanceCounterpart } from './getInstanceCounterpart'
import { isInsideInstance } from './isInsideInstance'
import { nodeToObject } from './nodeToObject'

/**
 * Returns the overrides for a specific node inside an instance
 * @param {SceneNode} node A specific node you want overrides for
 * @param {SceneNode} prop A specific prop you want to get overrides for
 * @returns Returns an object of properties. If you provide a prop it will provide a value.
 */

export function getOverrides(node, prop?) {


    if (isInsideInstance(node)) {
        var componentNode = getInstanceCounterpart(node)

        var properties = nodeToObject(node)
        var overriddenProps = {}

        if (prop) {
            
            if (prop !== "key"
                && prop !== "mainComponent"
                && prop !== "absoluteTransform"
                && prop !== "type"
                && prop !== "id"
                && prop !== "parent"
                && prop !== "children"
                && prop !== "masterComponent"
                && prop !== "mainComponent"
                && prop !== "horizontalPadding"
                && prop !== "verticalPadding"
                && prop !== "reactions"
                && prop !== "overlayPositionType"
                && prop !== "overflowDirection"
                && prop !== "numberOfFixedChildren"
                && prop !== "overlayBackground"
                && prop !== "overlayBackgroundInteraction"
                && prop !== "remote"
                && prop !== "defaultVariant"
                && prop !== "hasMissingFont"
                && prop !== "exportSettings"
                && prop !== "autoRename") {

                if (JSON.stringify(node[prop]) !== JSON.stringify(componentNode[prop])) {
                    return node[prop]
                }
            }
        } else {
            for (let [key, value] of Object.entries(properties)) {
                if (key !== "key"
                    && key !== "mainComponent"
                    && key !== "absoluteTransform"
                    && key !== "type"
                    && key !== "id"
                    && key !== "parent"
                    && key !== "children"
                    && key !== "masterComponent"
                    && key !== "mainComponent"
                    && key !== "horizontalPadding"
                    && key !== "verticalPadding"
                    && key !== "reactions"
                    && key !== "overlayPositionType"
                    && key !== "overflowDirection"
                    && key !== "numberOfFixedChildren"
                    && key !== "overlayBackground"
                    && key !== "overlayBackgroundInteraction"
                    && key !== "remote"
                    && key !== "defaultVariant"
                    && key !== "hasMissingFont"
                    && key !== "exportSettings"
                    && key !== "autoRename") {

                    if (JSON.stringify(properties[key]) !== JSON.stringify(componentNode[key])) {

                        overriddenProps[key] = value
                    }
                }
            }

            if (JSON.stringify(overriddenProps) === "{}") {
                return false
            }
            else {
                return overriddenProps
            }
        }
    }
}