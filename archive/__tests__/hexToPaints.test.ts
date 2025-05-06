import { hexToRgb, hexToPaints } from '../src/helpers/hexToPaints';


test('hexToRgb - convert colours', () => {  
    const red = hexToRgb('#ff0000')
    const green = hexToRgb('#00ff00')
    const blue = hexToRgb('#0000ff')
    const white = hexToRgb('#ffffff')
    const black = hexToRgb('#000000')

    expect(red).toStrictEqual({color:{r:1,g:0,b:0},opacity:1})
    expect(green).toStrictEqual({color:{r:0,g:1,b:0},opacity:1})
    expect(blue).toStrictEqual({color:{r:0,g:0,b:1},opacity:1})
    expect(white).toStrictEqual({color:{r:1,g:1,b:1},opacity:1})
    expect(black).toStrictEqual({color:{r:0,g:0,b:0},opacity:1})
});

test('alpha channel', () => {
    const redtint = '#ff00007f'
    const redtintpaint = hexToPaints(redtint)
    expect(redtintpaint).toStrictEqual([ { type: 'SOLID', color: { r: 1, g: 0, b: 0 }, opacity: 0.5 } ])
})

test('hexToRgb - differing lengths', () => {
    const hex3 = hexToRgb('f00')
    const hex4 = hexToRgb('f00a')
    const hex6 = hexToRgb('ff0000')
    const hex8 = hexToRgb('ff0000aa')

    expect(hex3).toStrictEqual({color:{r:1,g:0,b:0},opacity:1})
    expect(hex6).toStrictEqual(hex3)
    expect(hex4).toStrictEqual({color:{r:1,g:0,b:0},opacity:0.67})
    expect(hex8).toStrictEqual(hex4)
})

test('hex to paints', () => {
    const red = '#ff0000'
    const redpaint = hexToPaints(red)
    expect(redpaint).toStrictEqual([ { type: 'SOLID', color: { r: 1, g: 0, b: 0 }, opacity: 1 } ])
    
})


test('array of hexes', () => {
    const hexes = ['#ff0000','#00ff00','#0000ff']
    const paints = hexToPaints(hexes)
    expect(paints).toStrictEqual([ { type: 'SOLID', color: { r: 1, g: 0, b: 0 }, opacity: 1 },{ type: 'SOLID', color: { r: 0, g: 1, b: 0 },opacity: 1 },{ type: 'SOLID', color: { r: 0, g: 0, b: 1 },opacity: 1 } ])
    
})

test('Fill rectangle', () => {
    const rect = figma.createRectangle()
    rect.fills = hexToPaints('333333')
})