import { removeChildren } from '../src/helpers/removeChildren';

var frame = figma.createFrame()

frame.appendChild(figma.createRectangle())
frame.appendChild(figma.createRectangle())
frame.appendChild(figma.createRectangle())
frame.appendChild(figma.createRectangle())

test('children removed from node', () => {
    removeChildren(frame)
    
    expect(frame.children).toEqual([])
});