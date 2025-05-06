import { ungroup } from "../../src/helpers/ungroup";

var nodes = [
  figma.createRectangle(),
  figma.createRectangle(),
  figma.createRectangle(),
];
var parent = figma.currentPage;

var nodeGroup = figma.group(nodes, parent);

test("same array of nodes exists on parent", () => {
  ungroup(nodeGroup, parent);

  // Needed for test because stub API doesn't remove group nodes like real API does
  if (parent.children[0].type === "GROUP") {
    parent.children[0].remove();
  }

  for (let i = 0; i < parent.children.length; i++) {
    expect(parent.children[i]).toBe(nodes[i]);
  }
});
