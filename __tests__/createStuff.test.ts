import { createStuff } from '../src/createStuff';
import { createFigma } from 'figma-api-stub';

const figma = createFigma({});

test('Describe your test', () => {

    console.log(figma.createRectangle())

});