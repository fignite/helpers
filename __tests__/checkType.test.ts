import { isRectangle, isSticky } from "../src/helpers/checkType";

test("Check if node is rectangle node", () => {
  const rectangleNode: RectangleNode = figma.createRectangle();
  isRectangle(rectangleNode);
});

test("Check if node is frame node", () => {
  const frameNode: FrameNode = figma.createFrame();
  isSticky(frameNode);
});

test("Check if node is document node", () => {
  const docNode: DocumentNode = figma.root;
  isSticky(docNode);
});

test("Check if node is page node", () => {
  const pageNode: PageNode = figma.currentPage;
  isSticky(pageNode);
});
