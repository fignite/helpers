/**
 * Resizes a node, to allow nodes of size < 0.01
 * A value of zero will be replaced with 1/Number.MAX_SAFE_INTEGER
 * @param {SceneNode & LayoutMixin} node Node to resize
 * @param {number} width 
 * @param {number} height 
 * @returns Resized Node
 */
export function resize(node: SceneNode & LayoutMixin, width: number, height: number){
    //Workaround to resize a node, if its size is less than 0.01

    //If 0, make it almost zero
    width === 0 ? width = 1/Number.MAX_SAFE_INTEGER : null;
    height === 0 ? height = 1/Number.MAX_SAFE_INTEGER : null;
    let nodeParent = node.parent
    node.resize(width < 0.01 ? 1 : width,height < 0.01 ? 1 : height)
    if(width < 0.01 || height < 0.01){
    let dummy = figma.createRectangle()
    dummy.resize(width < 0.01 ? 1/width : width,height < 0.01 ? 1/height : height)
    let group: GroupNode = figma.group([node,dummy],figma.currentPage)
    group.resize(width < 0.01 ? 1 : width,height < 0.01 ? 1 : height)
    nodeParent.appendChild(node)
    group.remove()
    }
    return node
    }
