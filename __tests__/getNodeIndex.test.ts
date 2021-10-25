import { getNodeIndex } from '../src/index';

var rect1 = figma.createRectangle()
var rect2 = figma.createRectangle()
var rect3 = figma.createRectangle()

var parent = figma.currentPage;

parent.appendChild(rect1)
parent.appendChild(rect2)
parent.appendChild(rect3)

test('get index of node', () => {
    expect(getNodeIndex(rect3)).toBe(2)
});