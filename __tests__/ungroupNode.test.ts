import { ungroup } from '../src/helpers/ungroup';

var nodes = [
    figma.createRectangle(),
    figma.createRectangle(),
    figma.createRectangle()
]
var parent = figma.currentPage;

var nodeGroup = figma.group(nodes, parent)

test('same array of nodes exists on parent', () => {
    ungroup(nodeGroup, parent)

    for (let i = 0; i < parent.children.length; i++) {
        expect(parent.children[i]).toBe(nodes[i])
    }
});