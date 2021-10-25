/**
 * Converts a hex, or array of hexes into Paints[]
 * Can be used to fill a node
 * e.g node.fills = hexToPaints("#ff0000")
 * @param {string | string[] } hex 
 */

 export function hexToPaints(hexes: string | string[]): Paint[] {
  
    if(typeof hexes === 'string'){
      hexes = [hexes]
    }

    const Paints: Paint[] = hexes.map(hex => {

      let color = hexToRgb(hex);
       if(color == null){throw('Color is null')}else{
        let paint: Paint = {
            type: "SOLID",
            color
        }
        return paint
      }
    })

      return Paints
}


export function hexToRgb(hex) {
    hex =  hex.length < 6 ? hex.replace(new RegExp("([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])"), "$1$1$2$2$3$3") : hex;
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16)/255,
      g: parseInt(result[2], 16)/255,
      b: parseInt(result[3], 16)/255
    } : null;
  }