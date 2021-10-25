import { hexToRgb, hexToPaints } from '../src/helpers/hexToPaints';


test('hexToRgb - convert colours', () => {  
    const red = hexToRgb('#ff0000')
    const green = hexToRgb('#00ff00')
    const blue = hexToRgb('#0000ff')
    const white = hexToRgb('#ffffff')
    const black = hexToRgb('#000000')
    expect(red).toStrictEqual({r:1,g:0,b:0})
    expect(green).toStrictEqual({r:0,g:1,b:0})
    expect(blue).toStrictEqual({r:0,g:0,b:1})
    expect(white).toStrictEqual({r:1,g:1,b:1})
    expect(black).toStrictEqual({r:0,g:0,b:0})
});

test('hexToRgb - short hexes', () => {
    const redNoHash = hexToRgb('f00')
    const redWithHash = hexToRgb('#f00')
    expect(redNoHash).toStrictEqual({r:1,g:0,b:0})
    expect(redWithHash).toStrictEqual({r:1,g:0,b:0})
})

test('hex to paints', () => {
    const red = '#ff0000'
    const redpaint = hexToPaints(red)
    expect(redpaint).toStrictEqual([ { type: 'SOLID', color: { r: 1, g: 0, b: 0 } } ])
    
})

test('array of hexes', () => {
    const hexes = ['#ff0000','#00ff00','#0000ff']
    const paints = hexToPaints(hexes)
    expect(paints).toStrictEqual([ { type: 'SOLID', color: { r: 1, g: 0, b: 0 } },{ type: 'SOLID', color: { r: 0, g: 1, b: 0 } },{ type: 'SOLID', color: { r: 0, g: 0, b: 1 } } ])
    
})

test('Fill rectangle', () => {
    const rect = figma.createRectangle()
    rect.fills = hexToPaints('333333')
})