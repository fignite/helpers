import { copyPaste } from '../src/helpers/copyPaste';

var sourceNode = figma.createRectangle()
sourceNode.name = "Rectangle"
sourceNode.fills = [{ "type": "SOLID", "visible": true, "opacity": 1, "blendMode": "NORMAL", "color": { "r": 50, "g": 50, "b": 50 } }]
sourceNode.strokes = [{ "type": "SOLID", "visible": true, "opacity": 1, "blendMode": "NORMAL", "color": { "r": 50, "g": 50, "b": 50 } }]

var targetNode = figma.createFrame()

// TODO: Need to check is possible to avoid test mutating variabls above otherwise they are not true tests

test('copy all properties to an object', () => {
    // By default will copy all properties, including conflicting properties and relationships
    expect(copyPaste(sourceNode, {})).toEqual({
        parent: { id: '0:1', type: 'PAGE' },
        name: 'Rectangle',
        fills: [
            {
                type: 'SOLID',
                visible: true,
                opacity: 1,
                blendMode: 'NORMAL',
                color: {
                    b: 50,
                    g: 50,
                    r: 50,
                }
            }
        ],
        strokes: [
            {
                type: 'SOLID',
                visible: true,
                opacity: 1,
                blendMode: 'NORMAL',
                color: {
                    b: 50,
                    g: 50,
                    r: 50,
                }
            }
        ]
    })
})

test('copy properties from to target node while avoiding conflicts', () => {
    expect(copyPaste(sourceNode, targetNode)).toEqual({
        type: 'FRAME',
        children: [],
        id: '1:3',
        parent: { id: '0:1', type: 'PAGE' },
        name: 'Rectangle',
        fills: [
            {
                type: 'SOLID',
                visible: true,
                opacity: 1,
                blendMode: 'NORMAL',
                color: {
                    b: 50,
                    g: 50,
                    r: 50,
                }
            }
        ],
        strokes: [
            {
                type: 'SOLID',
                visible: true,
                opacity: 1,
                blendMode: 'NORMAL',
                color: {
                    b: 50,
                    g: 50,
                    r: 50,
                }
            }
        ]
    })
})

test('only copy certain properties to targetNode', () => {
    expect(copyPaste(sourceNode, targetNode, { include: ['name'] })).toEqual({
        type: 'FRAME',
        children: [],
        id: '1:3',
        parent: { id: '0:1', type: 'PAGE' },
        name: 'Rectangle'
    })
})

test('copy properties to targetNode but exlcude certain properties', () => {
    expect(copyPaste(sourceNode, targetNode, { exclude: ['fills', 'strokes'] })).toEqual({
        type: 'FRAME',
        children: [],
        id: '1:3',
        parent: { id: '0:1', type: 'PAGE' },
        name: 'Rectangle',
        fills: [
            {
                type: 'SOLID',
                visible: true,
                opacity: 1,
                blendMode: 'NORMAL',
                color: [Object]
            }
        ],
        strokes: [
            {
                type: 'SOLID',
                visible: true,
                opacity: 1,
                blendMode: 'NORMAL',
                color: [Object]
            }
        ]
    })
})

test('use a callback while copying properties from source node to target node', () => {
    console.log(copyPaste(sourceNode, targetNode, (prop) => {

    }))
})

// describe('copyPasteNode', () => {
//     test('copy compatible properties', () => {
//         const source = {
//             fills: 1,
//             fillStyleId: 'soaowlqla',
//             strokes: 1,
//             notAllowed: 1
//         }

//         const target = {
//             fills: 0,
//             fillStyleId: '',
//             strokes: 0,
//             backgrounds: []
//         }
//         expect(copyPasteProps(source, target)).toEqual({
//             fills: 0,
//             fillStyleId: 'soaowlqla',
//             strokes: 1,
//             backgrounds: []
//         })
//     })
//     test('exclude certain properties from being copied', () => {
//         const source = {
//             fills: 1,
//             fillStyleId: 'soaowlqla',
//             strokes: 1,
//             notAllowed: 1
//         }

//         const target = {
//             fills: 0,
//             fillStyleId: '',
//             strokes: 0,
//             backgrounds: []
//         }
//         expect(copyPasteProps(source, target, { exclude: ['strokes'] })).toEqual({
//             fills: 0,
//             fillStyleId: 'soaowlqla',
//             strokes: 0,
//             backgrounds: []
//         })
//     })
//     test('only copy certain properties', () => {
//         const source = {
//             fills: 1,
//             fillStyleId: 'soaowlqla',
//             strokes: 1,
//             notAllowed: 1
//         }

//         const target = {
//             fills: 0,
//             fillStyleId: '',
//             strokes: 0,
//             backgrounds: []
//         }
//         expect(copyPasteProps(source, target, { include: ['strokes'] })).toEqual({
//             fills: 0,
//             fillStyleId: '',
//             strokes: 1,
//             backgrounds: []
//         })
//     })
// })