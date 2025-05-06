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
            color: color.color,
            opacity: color.opacity
        }
        return paint
      }
    })

      return Paints
}


export function hexToRgb(hex) {

    hex = hex.replace('#','')
    hex.length == 3 ? hex += "F" : null;

    hex.length == 4 ? hex = hex.replace(new RegExp("([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])"), "$1$1$2$2$3$3$4$4") : null;

    hex.length == 6 ? hex += "FF" : null;


    console.log(hex)


    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
      color: {
        r: parseInt(result[1], 16)/255,
        g: parseInt(result[2], 16)/255,
        b: parseInt(result[3], 16)/255
      },
      opacity: parseFloat((parseInt(result[4], 16)/255).toFixed(2))
    } : null;
  }