import { copyPaste } from "./copyPaste";
import { getNodeIndex } from "./getNodeIndex";
import { nodeToObject } from "./nodeToObject";

function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
}

// TODO: Add option to ignore width and height?
// TODO: Could do with refactoring

/**
 * Replace any node with another node
 * @param {SceneNode} target The node you want to replace
 * @param {SceneNode | Callback} source What you want to replace the node with
 * @returns Returns the new node as a component
 */

export function replace(target, source) {
  let isSelection = false;
  let targetCopy;
  let clonedSelection = [];
  let nodeIndex;
  let parent;

  // If it's a selection we need to create a dummy node that represents the whole of the selection to base the properties off
  if (Array.isArray(target)) {
    nodeIndex = getNodeIndex(target[0]);
    parent = target[0].parent;

    // Clone the target so the actual target doesn't move
    for (let i = 0; i < target.length; i++) {
      let clone = target[i].clone();
      clonedSelection.push(clone);
    }

    // parent.insertChild(clone, nodeIndex)
    targetCopy = figma.group(clonedSelection, parent, nodeIndex);

    // I think this needs to happen because when you create a clone it doesn't get inserted into the same location as the original node?
    targetCopy.x = target[0].x;
    targetCopy.y = target[0].y;
    isSelection = true;
    nodeIndex = getNodeIndex(targetCopy);
    parent = targetCopy.parent;
  } else {
    targetCopy = nodeToObject(target);
    nodeIndex = getNodeIndex(target);
    parent = target.parent;
  }
  let targetWidth = targetCopy.width;
  let targetHeight = targetCopy.height;

  let result;

  if (isFunction(source)) {
    result = source(target);
  } else {
    result = source;
  }

  if (result) {
    // FIXME: Add this into copyPaste helper

    // FIXME: How to resize 0 height/width nodes
    if (targetWidth >= 0.01 && targetHeight >= 0.01) {
      result.resizeWithoutConstraints(targetWidth, targetHeight);
    }

    copyPaste(targetCopy, result, { include: ["x", "y", "constraints"] });

    // copyPaste not working properly so have to manually copy x and y
    result.x = targetCopy.x;
    result.y = targetCopy.y;
    parent.insertChild(nodeIndex, result);

    if (isSelection) {
      targetCopy.remove();
      // clonedSelection gets removed when this node gets removed
    }

    if (figma.getNodeById(target.id)) {
      target.remove();
    }
    return result;
  }
}
