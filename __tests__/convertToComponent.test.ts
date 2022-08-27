import { convertToComponent } from "../src/helpers/convertToComponent";

var frame = figma.createFrame();

test("converts frame to component", () => {
  expect(convertToComponent(frame).type).toEqual("COMPONENT");
});
