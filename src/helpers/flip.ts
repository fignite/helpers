//TODO: Write tests for flips
/**
* Flips a node on the X axis, mimics the native figma functionality.
* Transform is centered on the node
*
* @param node - The node you want to flip
*/
export function flipX(node: LayoutMixin) {
    let rt = node.relativeTransform;
    let bounds = node.absoluteRenderBounds;
    let [[a, c, e], [b, d, f]] = [...rt];
    let mult = a < 0 ? 0 : 1;
    let newAbsX = bounds.x + bounds.width * mult;
    node.relativeTransform = [
      [(a *= -1), (c *= -1), newAbsX],
      [b, d, f],
    ];
  }

/**
* Flips a node on the Y axis, mimics the native figma functionality.
* Transform is centered on the node
*
* @param node - The node you want to flip
*/
 export function flipY(node: LayoutMixin) {
    let rt = node.relativeTransform;
    let bounds = node.absoluteRenderBounds;
  
    let midY = bounds.y + bounds.height / 2;
    let dY = midY - node.y;
    let newY = node.y + dY * 2;
  
    let [[a, c, e], [b, d, f]] = [...rt];
  
    node.relativeTransform = [
      [a, c, e],
      [(b *= -1), (d *= -1), newY],
    ];
  }
