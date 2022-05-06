/**
 * Convinient way to delete children of a node
 * @param {SceneNode & ChildrenMixin } node A node with children
 */

export function removeChildren(node: SceneNode & ChildrenMixin) {
  let length = node.children.length;
  for (let i = length - 1; i >= 0; i--) {
    node.children[i].remove();
  }
}
