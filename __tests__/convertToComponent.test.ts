import { convertToComponent } from '../src/index';

var frame = figma.createFrame()

test('converts frame to component', () => {
    console.log(convertToComponent(frame))
    expect(convertToComponent(frame).type).toEqual("COMPONENT")
});