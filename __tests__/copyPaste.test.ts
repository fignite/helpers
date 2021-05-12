import { copyPaste } from '../src/helpers/copyPaste';

// We create nodes here so that id is consistent across all tests
var sourceNode = figma.createRectangle()
var targetNode = figma.createFrame()

// We do this because this is the only way to reset the object back to it's orginal state after test (although figma-api-stub doesn't create name, but it should)
var targetOrigName = targetNode.name

beforeEach(() => {
    sourceNode.name = "Rectangle"
    sourceNode.fillStyleId = "S:ec61af737cd69824f329118fdcb3b0b96985139d,"
    sourceNode.fills = [{ "type": "SOLID", "visible": true, "opacity": 1, "blendMode": "NORMAL", "color": { "r": 50, "g": 50, "b": 50 } }]
    sourceNode.strokes = [{ "type": "SOLID", "visible": true, "opacity": 1, "blendMode": "NORMAL", "color": { "r": 50, "g": 50, "b": 50 } }]
})

afterEach(() => {
    // Check if there was a name and set to original, if not delete (wouldn't need to delete if figma-api-stub set name)
    if (targetOrigName) {
        targetNode.name = targetOrigName
    }
    else {
        delete targetNode.name
    }
    delete targetNode.fills
    delete targetNode.strokes
    delete targetNode.fillStyleId
    delete targetNode.strokes
})

test.todo(`Doesn't work with Figma stub`)

// Tests don't work because figma stub doesn't have getters and setters

// test('copy all properties to an object', () => {
//     // By default will copy all properties, including conflicting properties and relationships
//     expect(copyPaste(sourceNode, {})).toEqual({
//         id: '1:2',
//         type: 'RECTANGLE',
//         parent: {
//             id: '0:1',
//             type: 'PAGE'
//         },
//         name: 'Rectangle',
//         fillStyleId: "S:ec61af737cd69824f329118fdcb3b0b96985139d,",
//         strokes: [
//             {
//                 type: 'SOLID',
//                 visible: true,
//                 opacity: 1,
//                 blendMode: 'NORMAL',
//                 color: {
//                     b: 50,
//                     g: 50,
//                     r: 50,
//                 }
//             }
//         ]
//     })

//     // console.log(copyPaste(sourceNode, {}))
// })

// test('copy properties from to target node while avoiding conflicts', () => {
    
//     expect(copyPaste(sourceNode, targetNode)).toEqual({
//         id: '1:3',
//         type: 'FRAME',
//         children: [],
//         parent: expect.anything(),
//         name: 'Rectangle',
//         fillStyleId: "S:ec61af737cd69824f329118fdcb3b0b96985139d,",
//         strokes: [
//             {
//                 type: 'SOLID',
//                 visible: true,
//                 opacity: 1,
//                 blendMode: 'NORMAL',
//                 color: {
//                     b: 50,
//                     g: 50,
//                     r: 50,
//                 }
//             }
//         ]
//     })
// })

// test('only copy certain properties to targetNode', () => {
//     expect(copyPaste(sourceNode, targetNode, { include: ['name'] })).toEqual({
//         id: '1:3',
//         type: 'FRAME',
//         children: [],
//         parent: expect.anything(),
//         name: 'Rectangle'
//     })
// })

// test('copy properties to targetNode but exlcude certain properties', () => {
//     expect(copyPaste(sourceNode, targetNode, { exclude: ['fills', 'strokes'] })).toEqual({
//         id: '1:3',
//         type: 'FRAME',
//         children: [],
//         parent: expect.anything(),
//         name: 'Rectangle',
//         fillStyleId: 'S:ec61af737cd69824f329118fdcb3b0b96985139d,'
//     })
// })

// test('use a callback while copying properties from source node to target node', () => {
//     // console.log(copyPaste(sourceNode, targetNode, (prop) => {

//     // }))
// })