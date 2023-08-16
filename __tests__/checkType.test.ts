import {
  isDocument,
  isPage,
  isRectangle,
  isFrame,
  isSlice,
  isGroup,
  isComponent,
  isComponentSet,
  isInstance,
  isLine,
  isEllipse,
  isPolygon,
  isVector,
  isText,
  isBool,
  isStar,
  isImage,
} from "../src/helpers/checkType";

test("Check if node is document node", () => {
  const docNode: DocumentNode = figma.root;
  isDocument(docNode);
});

test("Check if node is page node", () => {
  const pageNode: PageNode = figma.currentPage;
  isPage(pageNode);
});

test("Check if node is rectangle node", () => {
  const rectangleNode: RectangleNode = figma.createRectangle();
  isRectangle(rectangleNode);
});

test("Check if node is frame node", () => {
  const frameNode: FrameNode = figma.createFrame();
  isFrame(frameNode);
});

/* Not included in JEST */
// test("Check if node is slice node", () => {
//   const sliceNode: SliceNode = figma.createSlice();
//   isSlice(sliceNode);
// });

test("Check if node is group node", () => {
  const nodes = [
    figma.createRectangle(),
    figma.createRectangle(),
    figma.createRectangle(),
  ];
  var parent = figma.currentPage;
  const groupNode: GroupNode = figma.group(nodes, parent, 0);
  isGroup(groupNode);
});

test("Check if node is component node", () => {
  const componentNode: ComponentNode = figma.createComponent();
  isComponent(componentNode);
});

/* Not included in JEST */
// test("Check if node is component set node", () => {
//   const nodes: ComponentNode[] = [
//     figma.createComponent(),
//     figma.createComponent(),
//     figma.createComponent(),
//   ];
//   var parent = figma.currentPage;
//   const componentSetNode: ComponentSetNode = figma.combineAsVariants(
//     nodes,
//     parent,
//     0
//   );
//   isComponentSet(componentSetNode);
// });

test("Check if node is instance node", () => {
  const componentNode: ComponentNode = figma.createComponent();
  const instanceNode: InstanceNode = componentNode.createInstance();
  isInstance(instanceNode);
});

/* Not included in JEST */
// test("Check if node is line node", () => {
//   const lineNode: LineNode = figma.createLine();
//   isLine(lineNode);
// });

/* Not included in JEST */
// test("Check if node is ellipse node", () => {
//   const ellipseNode: EllipseNode = figma.createEllipse();
//   isEllipse(ellipseNode);
// });

/* Not included in JEST */
// test("Check if node is polygon node", () => {
//   const polygoneNode: PolygonNode = figma.createPolygon();
//   isPolygon(polygoneNode);
// });

/* Not included in JEST */
// test("Check if node is star node", () => {
//   const starNode: StarNode = figma.createStar();
//   isStar(starNode);
// });

test("Check if node is image node", () => {
  const rectangle = figma.createRectangle();
  rectangle.fills = [{ type: "IMAGE", scaleMode: "FILL", imageHash: "" }];
  const paint: ImagePaint = rectangle.fills[0];
  isImage(paint);
});

/* Not included in JEST */
// test("Check if node is vector node", () => {
//   const vectorNode: VectorNode = figma.createVector();
//   isVector(vectorNode);
// });

test("Check if node is text node", () => {
  const textNode: TextNode = figma.createText();
  isText(textNode);
});

/* Not included in JEST */
// test("Check if node is boolean node", () => {
//   const nodes = [figma.createRectangle(), figma.createRectangle()];
//   var parent = figma.currentPage;
//   const boolNode: BooleanOperationNode = figma.union(nodes, parent, 0);
//   isBool(boolNode);
// });
