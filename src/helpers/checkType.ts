// FIGMA FUNCTIONS

/* Usage

When needing to check a nodes type, instead of typing out `node.type === "TYPE"` each time, you can simply type `isFrame(node)` like you can inside Scripter

*/

export function isDocument(
  node: BaseNode | null | undefined
): node is DocumentNode {
  return node.type === "DOCUMENT";
}

export function isPage(node: BaseNode | null | undefined): node is PageNode {
  return node.type === "PAGE";
}

export function isSlice(node: BaseNode | null | undefined): node is SliceNode {
  return node.type === "SLICE";
}

export function isFrame(node: BaseNode | null | undefined): node is FrameNode {
  return node.type === "FRAME";
}

export function isGroup(node: BaseNode | null | undefined): node is GroupNode {
  return node.type === "GROUP";
}

export function isComponent(
  node: BaseNode | null | undefined
): node is ComponentNode {
  return node.type === "COMPONENT";
}

export function isComponentSet(
  node: BaseNode | null | undefined
): node is ComponentSetNode {
  return node.type === "COMPONENT_SET";
}

export function isInstance(
  node: BaseNode | null | undefined
): node is InstanceNode {
  return node.type === "INSTANCE";
}

export function isRectangle(
  node: BaseNode | null | undefined
): node is RectangleNode {
  return node.type === "RECTANGLE";
}

export function isLine(node: BaseNode | null | undefined): node is LineNode {
  return node.type === "LINE";
}

export function isEllipse(
  node: BaseNode | null | undefined
): node is EllipseNode {
  return node.type === "ELLIPSE";
}

export function isPolygon(
  node: BaseNode | null | undefined
): node is PolygonNode {
  return node.type === "POLYGON";
}

export function isStar(node: BaseNode | null | undefined): node is StarNode {
  return node.type === "STAR";
}

export function isImage(paint: Paint | null | undefined): paint is ImagePaint {
  return paint.type === "IMAGE";
}

export function isVector(
  node: BaseNode | null | undefined
): node is VectorNode {
  return node.type === "VECTOR";
}

export function isText(node: BaseNode | null | undefined): node is TextNode {
  return node.type === "TEXT";
}

export function isBool(
  node: BaseNode | null | undefined
): node is BooleanOperationNode {
  return node.type === "BOOLEAN_OPERATION";
}

export function isShapeWithText(
  node: BaseNode | null | undefined
): node is ShapeWithTextNode {
  return node.type === "SHAPE_WITH_TEXT";
}

export function isSticky(
  node: BaseNode | null | undefined
): node is StickyNode {
  return node.type === "STICKY";
}

export function isStamp(node: BaseNode | null | undefined): node is StampNode {
  return node.type === "STAMP";
}

export function isConnector(
  node: BaseNode | null | undefined
): node is ConnectorNode {
  return node.type === "CONNECTOR";
}
