const nodeProps: string[] = [
    'id',
    'parent',
    'name',
    'removed',
    'visible',
    'locked',
    'children',
    'constraints',
    'absoluteTransform',
    'relativeTransform',
    'x',
    'y',
    'rotation',
    'width',
    'height',
    'constrainProportions',
    'layoutAlign',
    'layoutGrow',
    'opacity',
    'blendMode',
    'isMask',
    'effects',
    'effectStyleId',
    'expanded',
    'backgrounds',
    'backgroundStyleId',
    'fills',
    'strokes',
    'strokeWeight',
    'strokeMiterLimit',
    'strokeAlign',
    'strokeCap',
    'strokeJoin',
    'dashPattern',
    'fillStyleId',
    'strokeStyleId',
    'cornerRadius',
    'cornerSmoothing',
    'topLeftRadius',
    'topRightRadius',
    'bottomLeftRadius',
    'bottomRightRadius',
    'exportSettings',
    'overflowDirection',
    'numberOfFixedChildren',
    'overlayPositionType',
    'overlayBackground',
    'overlayBackgroundInteraction',
    'reactions',
    'description',
    'remote',
    'key',
    'layoutMode',
    'primaryAxisSizingMode',
    'counterAxisSizingMode',
    'primaryAxisAlignItems',
    'counterAxisAlignItems',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
    'itemSpacing',
    // 'horizontalPadding',
    // 'verticalPadding',
    'layoutGrids',
    'gridStyleId',
    'clipsContent',
    'guides',
    'type'
]

const instanceProps: string[] = [
    'rotation',
    'constrainProportions'
]

const readOnly: string[] = [
    'id',
    'parent',
    'removed',
    'children',
    'absoluteTransform',
    'width',
    'height',
    'overlayPositionType',
    'overlayBackground',
    'overlayBackgroundInteraction',
    'reactions',
    'remote',
    'key',
    'type'
]

const defaults: string[] = [
    'name',
    'guides',
    'description',
    'remote',
    'key',
    'reactions',
    'x',
    'y',
    'exportSettings',
    'expanded',
    'isMask',
    'exportSettings',
    'overflowDirection',
    'numberOfFixedChildren',
    'constraints',
    'relativeTransform'
]

const mixedProps = {
    cornerRadius: [
        'topleftCornerRadius',
        'topRightCornerRadius',
        'bottomLeftCornerRadius',
        'bottomRightCornerRadius']
}

// function applyMixedValues(node, prop) {


//     const obj = {};

//     if (mixedProps[prop] && node[prop] === figma.mixed) {
//         for (let prop of mixedProp[prop]) {
//             obj[prop] = source[prop]
//         }
//     } else {
//         obj[prop] = node[prop]
//     }
// }

type Options = {
    withoutRelations?: boolean
    removeConflicts?: boolean,
    except: string[],
    only?: undefined
} | {
    withoutRelations?: boolean
    removeConflicts?: boolean,
    only: string[],
    except?: undefined
}

type Callback = (prop: string) => void;

// export function copyPaste(source: {} | BaseNode, target: {} | BaseNode)
// export function copyPaste(source: {} | BaseNode, target: {} | BaseNode, options: Options)
// export function copyPaste(source: {} | BaseNode, target: {} | BaseNode, callback: Callback)
// export function copyPaste(source: {} | BaseNode, target: {} | BaseNode, options: Options, callback: Callback)
// export function copyPaste(source: {} | BaseNode, target: {} | BaseNode, callback: Callback, options: Options)

/**
* Allows you to copy and paste props between nodes.
*
* @param source - The node or object you want to copy from
* @param target - The node or object you want to paste to
* @param args - Either options or a callback
* @returns A node or object with the properties copied over
*/

export function copyPaste(source: BaseNode, target: {} | BaseNode, ...args: (Options | Callback)[]) {

    var callback, options;

    if (typeof args[0] === 'function') callback = args[0]
    if (typeof args[1] === 'function') callback = args[1]

    if (typeof args[0] === 'object' && typeof args[0] !== 'function') options = args[0]
    if (typeof args[0] === 'object' && typeof args[0] !== 'function') options = args[0]

    if (!options) options = {}

    const { only, except, withoutRelations, removeConflicts } = options

    // const props = Object.entries(Object.getOwnPropertyDescriptors(source.__proto__))
    let allowlist: string[] = nodeProps

    if (only) {
        // If only supplied, only copy across these properties and their values if they exist
        allowlist = only
    } else if (except) {
        // If except supplied then don't copy over the values of these properties
        allowlist = allowlist.filter(function (el) {
            return !except.concat(readOnly).includes(el)
        })
    }

    // target supplied, don't copy over the values of these properties
    if (target !== {}) {
        allowlist = allowlist.filter(function (el) {
            return !['id', 'type'].includes(el)
        })
    }

    var obj: any = target;

    if (obj.id === undefined) {
        obj.id = source.id
    }

    if (obj.type === undefined) {
        obj.type = source.type
    }

    for (const [key, value] of Object.entries(source)) {

        if (allowlist.includes(key)) {

            obj[key] = value
        }

        if (callback) {
            callback(obj)
        }
        else {

        }


    }

    if (source.parent && !withoutRelations) {
        obj.parent = { id: source.parent.id, type: source.parent.type }
    }

    if (source.type === "FRAME" || source.type === "COMPONENT" || source.type === "COMPONENT_SET" || source.type === "PAGE" || source.type === 'GROUP' || source.type === 'INSTANCE' || source.type === 'DOCUMENT' || source.type === 'BOOLEAN_OPERATION') {
        if (source.children && !withoutRelations) {
            obj.children = source.children.map((child: any) => copyPaste(child, withoutRelations))
        }
    }

    if (source.type === "INSTANCE") {
        if (source.mainComponent && !withoutRelations) {
            obj.masterComponent = copyPaste(source.mainComponent, withoutRelations)
        }
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