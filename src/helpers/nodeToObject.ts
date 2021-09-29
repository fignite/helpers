export const nodeToObject = (node: any, withoutRelations?: boolean, removeConflicts?: boolean) => {
    const props = Object.entries(Object.getOwnPropertyDescriptors(node.__proto__))
    const blacklist = ['parent', 'children', 'removed', 'masterComponent', 'horizontalPadding', 'verticalPadding']
    const obj: any = { id: node.id, type: node.type }
    for (const [name, prop] of props) {
        if (prop.get && !blacklist.includes(name)) {
            try {
                if (typeof obj[name] === 'symbol') {
                    obj[name] = 'Mixed'
                } else {
                    obj[name] = prop.get.call(node)
                }
            } catch (err) {
                obj[name] = undefined
            }
        }
    }
    if (node.parent && !withoutRelations) {
        obj.parent = { id: node.parent.id, type: node.parent.type }
    }
    if (node.children && !withoutRelations) {
        obj.children = node.children.map((child: any) => nodeToObject(child, withoutRelations))
    }
    if (node.masterComponent && !withoutRelations) {
        obj.masterComponent = nodeToObject(node.masterComponent, withoutRelations)
    }

    if (!removeConflicts) {
        !obj.fillStyleId && obj.fills ? delete obj.fillStyleId : delete obj.fills
        !obj.strokeStyleId && obj.strokes ? delete obj.strokeStyleId : delete obj.strokes
        !obj.backgroundStyleId && obj.backgrounds ? delete obj.backgroundStyleId : delete obj.backgrounds
        !obj.effectStyleId && obj.effects ? delete obj.effectStyleId : delete obj.effects
        !obj.gridStyleId && obj.layoutGrids ? delete obj.gridStyleId : delete obj.layoutGrids

        if (obj.textStyleId) {
            delete obj.fontName
            delete obj.fontSize
            delete obj.letterSpacing
            delete obj.lineHeight
            delete obj.paragraphIndent
            delete obj.paragraphSpacing
            delete obj.textCase
            delete obj.textDecoration
        }
        else {
            delete obj.textStyleId
        }

        if (obj.cornerRadius !== figma.mixed) {
            delete obj.topLeftRadius
            delete obj.topRightRadius
            delete obj.bottomLeftRadius
            delete obj.bottomRightRadius
        }
        else {
            delete obj.cornerRadius
        }
    }

    return obj
}