import { copyPaste } from "./copyPaste";

function groupToFrame(group) {
  let groupRotation = group.rotation;

  // Create frame to replace group
  let frame = figma.createFrame();
  frame.fills = [];
  frame.x = group.x;
  frame.y = group.y;
  frame.name = group.name;

  frame.resize(group.width, group.height);
  // Add group to frame so that we can reset their x, y cordinates
  frame.appendChild(group);

  // Reset x, y, and rotation coordinates
  group.x = 0;
  group.y = 0;
  group.rotation = 0;

  // Ungrouping will automatically make contents children of the frame
  figma.ungroup(group);

  // Re-apply rotation
  frame.rotation = groupRotation;

  return frame;
}

/**
 * Converts an instance, component, or rectangle to a frame
 * @param {SceneNode} node The node you want to convert to a frame
 * @returns Returns the new node as a frame
 */

export function convertToFrame(node: SceneNode): FrameNode {
  // Save index, parent and rotation of group before removed
  let nodeIndex = node.parent.children.indexOf(node);
  let nodeParent = node.parent;
  let newFrame: FrameNode;

  if (node.type === "INSTANCE") {
    newFrame = node.detachInstance();
  }

  if (node.type === "COMPONENT") {
    // This method preserves plugin data and relaunch data
    let frame = node.createInstance().detachInstance();
    // Beacuse `createInstance` doesn't inherit rotation, apparently
    frame.rotation = node.rotation;

    nodeParent.appendChild(frame);

    copyPaste(node, frame, { include: ["x", "y"] });

    // Treat like native method
    figma.currentPage.appendChild(frame);
    node.remove();
    newFrame = frame;
  }

  if (node.type === "GROUP") {
    let frame = groupToFrame(node);
    newFrame = frame;
  }

  if (node.type === "RECTANGLE") {
    let frame = figma.createFrame();

    // FIXME: Add this into copyPaste helper
    frame.resizeWithoutConstraints(node.width, node.height);
    copyPaste(node, frame);

    node.remove();
    newFrame = frame;
  }

  if (node.type === "FRAME") {
    // Don't do anything to it if it's a frame
    newFrame = node;
  }

  // Re-insert frame into its original position
  nodeParent.insertChild(nodeIndex, newFrame);

  return newFrame;
}
