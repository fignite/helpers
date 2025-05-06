// Refactor this function so that it:
// Has an option for overridesOnly
// Has an option to copyPaste recursively (via children)

function isObjLiteral(_obj) {
  var _test = _obj;
  return typeof _obj !== "object" || _obj === null
    ? false
    : (function () {
        while (!false) {
          if (
            Object.getPrototypeOf((_test = Object.getPrototypeOf(_test))) ===
            null
          ) {
            break;
          }
        }
        return Object.getPrototypeOf(_obj) === _test;
      })();
}

function isObjEmpty(value) {
  if (
    value &&
    Object.keys(value).length === 0 &&
    value.constructor === Object
  ) {
    return true;
  }
}

const nodeProps: string[] = [
  "id",
  "parent",
  "name",
  "removed",
  "visible",
  "locked",
  "children",
  "constraints",
  "absoluteTransform",
  "relativeTransform",
  "x",
  "y",
  "rotation",
  "width",
  "height",
  "constrainProportions",
  "layoutAlign",
  "layoutGrow",
  "opacity",
  "blendMode",
  "isMask",
  "effects",
  "effectStyleId",
  "expanded",
  "backgrounds",
  "backgroundStyleId",
  "fills",
  "strokes",
  "strokeWeight",
  "strokeMiterLimit",
  "strokeAlign",
  "strokeCap",
  "strokeJoin",
  "dashPattern",
  "fillStyleId",
  "strokeStyleId",
  "cornerRadius",
  "cornerSmoothing",
  "topLeftRadius",
  "topRightRadius",
  "bottomLeftRadius",
  "bottomRightRadius",
  "exportSettings",
  "overflowDirection",
  "numberOfFixedChildren",
  "overlayPositionType",
  "overlayBackground",
  "overlayBackgroundInteraction",
  "reactions",
  "description",
  "remote",
  "key",
  "layoutMode",
  "primaryAxisSizingMode",
  "counterAxisSizingMode",
  "primaryAxisAlignItems",
  "counterAxisAlignItems",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "paddingBottom",
  "itemSpacing",
  // 'horizontalPadding',
  // 'verticalPadding',
  "layoutGrids",
  "gridStyleId",
  "clipsContent",
  "guides",
  "type",
  "strokeTopWeight",
  "strokeBottomWeight",
  "strokeRightWeight",
  "strokeLeftWeight",
];

const instanceProps: string[] = ["rotation", "constrainProportions"];

const readOnly: string[] = [
  "id",
  "parent",
  "removed",
  "children",
  "absoluteTransform",
  "width",
  "height",
  "overlayPositionType",
  "overlayBackground",
  "overlayBackgroundInteraction",
  "reactions",
  "remote",
  "key",
  "type",
  "masterComponent",
  "mainComponent",
];

const defaults: string[] = [
  "name",
  "guides",
  "description",
  "remote",
  "key",
  "reactions",
  "x",
  "y",
  "exportSettings",
  "expanded",
  "isMask",
  "exportSettings",
  "overflowDirection",
  "numberOfFixedChildren",
  "constraints",
  "relativeTransform",
];

const mixedProps = {
  cornerRadius: [
    "topleftCornerRadius",
    "topRightCornerRadius",
    "bottomLeftCornerRadius",
    "bottomRightCornerRadius",
  ],
};

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
  withoutRelations?: boolean;
  removeConflicts?: boolean;
  exclude?: string[];
  include?: string[];
};

type Callback = (prop: string) => void;

// export function copyPaste(source: {} | BaseNode, target: {} | BaseNode)
// export function copyPaste(source: {} | BaseNode, target: {} | BaseNode, options: Options)
// export function copyPaste(source: {} | BaseNode, target: {} | BaseNode, callback: Callback)
// export function copyPaste(source: {} | BaseNode, target: {} | BaseNode, options: Options, callback: Callback)
// export function copyPaste(source: {} | BaseNode, target: {} | BaseNode, callback: Callback, options: Options)

/**
 * Allows you to copy and paste props between nodes.
 *
 * @param source - The node you want to copy from
 * @param target - The node or object you want to paste to
 * @param args - Either options or a callback.
 * @returns A node or object with the properties copied over
 */

// FIXME: When an empty objet is provided, copy over all properties including width and height
// FIXME: Don't require a setter in order to copy property. Should be able to copy from an object literal for example.

export function copyPaste(
  source: any,
  target: any | BaseNode,
  ...args: (Options | Callback)[]
) {
  var targetIsEmpty;

  if (
    target &&
    Object.keys(target).length === 0 &&
    target.constructor === Object
  ) {
    targetIsEmpty = true;
  }

  var callback, options;

  if (typeof args[0] === "function") callback = args[0];
  if (typeof args[1] === "function") callback = args[1];

  if (typeof args[0] === "object" && typeof args[0] !== "function")
    options = args[0];
  if (typeof args[0] === "object" && typeof args[0] !== "function")
    options = args[0];

  if (!options) options = {};

  const { include, exclude, withoutRelations, removeConflicts } = options;

  // const props = Object.entries(Object.getOwnPropertyDescriptors(source.__proto__))
  let allowlist: string[] = nodeProps.filter(function (el) {
    return !readOnly.includes(el);
  });

  if (include) {
    // If include supplied, include copy across these properties and their values if they exist
    allowlist = include.filter(function (el) {
      return !readOnly.includes(el);
    });
  }

  if (exclude) {
    // If exclude supplied then don't copy over the values of these properties
    allowlist = allowlist.filter(function (el) {
      return !exclude.concat(readOnly).includes(el);
    });
  }

  // target supplied, don't copy over the values of these properties
  if (target && !targetIsEmpty) {
    allowlist = allowlist.filter(function (el) {
      return !["id", "type"].includes(el);
    });
  }

  var obj: any = {};

  if (targetIsEmpty) {
    if (obj.id === undefined) {
      obj.id = source.id;
    }

    if (obj.type === undefined) {
      obj.type = source.type;
    }

    if (source.key) obj.key = source.key;
  }

  let props;

  if (!isObjLiteral(source)) {
    props = Object.entries(Object.getOwnPropertyDescriptors(source.__proto__));
  } else {
    props = Object.entries(source);
  }

  for (const [key, value] of props) {
    if (allowlist.includes(key)) {
      try {
        // if (key === "strokeWeight") {
        //   console.log("strokeWeight", value.get.call(source));
        // }
        // Add check to see if value is  symbol
        if (
          typeof source[key] === "symbol" // Don't think this is working as obj is empty
        ) {
          // obj[key] = "Mixed"; // Don't provide because cannot apply to nodes
        } else {
          if (!isObjLiteral(source)) {
            obj[key] = value.get.call(source);
          } else {
            obj[key] = value;
          }
        }
      } catch (err) {
        obj[key] = undefined;
      }
    }
    // Needs building in
    // if (callback) {
    //     callback(obj)
    // }
    // else {

    // }
  }

  // These are properties that have no setters and would break plugin when trying to set on a node
  if (!removeConflicts) {
    !obj.fillStyleId && obj.fills ? delete obj.fillStyleId : delete obj.fills;
    !obj.strokeStyleId && obj.strokes
      ? delete obj.strokeStyleId
      : delete obj.strokes;
    !obj.backgroundStyleId && obj.backgrounds
      ? delete obj.backgroundStyleId
      : delete obj.backgrounds;
    !obj.effectStyleId && obj.effects
      ? delete obj.effectStyleId
      : delete obj.effects;
    !obj.gridStyleId && obj.layoutGrids
      ? delete obj.gridStyleId
      : delete obj.layoutGrids;

    if (obj.textStyleId) {
      delete obj.fontName;
      delete obj.fontSize;
      delete obj.letterSpacing;
      delete obj.lineHeight;
      delete obj.paragraphIndent;
      delete obj.paragraphSpacing;
      delete obj.textCase;
      delete obj.textDecoration;
    } else {
      delete obj.textStyleId;
    }

    if (obj.cornerRadius !== figma.mixed) {
      delete obj.topLeftRadius;
      delete obj.topRightRadius;
      delete obj.bottomLeftRadius;
      delete obj.bottomRightRadius;
    } else {
      delete obj.cornerRadius;
    }

    // Can't be applied to an instance, remove for now
    if (obj.overflowDirection) {
      delete obj.overflowDirection;
    }
    if (obj.isMask) {
      delete obj.isMask;
    }
  }

  // Only applicable to objects because these properties cannot be set on nodes
  if (targetIsEmpty) {
    if (source.parent && !withoutRelations) {
      obj.parent = { id: source.parent.id, type: source.parent.type };
    }
  }

  // Only applicable to objects because these properties cannot be set on nodes
  if (targetIsEmpty) {
    if (
      source.type === "FRAME" ||
      source.type === "COMPONENT" ||
      source.type === "COMPONENT_SET" ||
      source.type === "PAGE" ||
      source.type === "GROUP" ||
      source.type === "INSTANCE" ||
      source.type === "DOCUMENT" ||
      source.type === "BOOLEAN_OPERATION"
    ) {
      if (source.children && !withoutRelations) {
        obj.children = source.children.map((child: any) =>
          copyPaste(child, {}, { withoutRelations })
        );
      }
    }

    if (source.type === "INSTANCE") {
      if (source.mainComponent && !withoutRelations) {
        obj.masterComponent = copyPaste(
          source.mainComponent,
          {},
          { withoutRelations }
        );
      }
    }
  }

  if (
    target?.type !== "FRAME" ||
    target?.type !== "COMPONENT" ||
    target?.type !== "COMPONENT_SET"
  ) {
    delete obj.backgrounds;
  }

  // console.log(obj);

  if (!isObjEmpty(obj)) {
    Object.assign(target, obj);
  }

  return target;
}
