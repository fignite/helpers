# Figlets
A collection of helpers for Figma plugins

## Testing

For each helper create a unit test by making a file with the same name as the helper in the `__tests__` directory. Use *Jests* built-in `test()` function to create a test.

```js
// __tests__/createRectangles.test.ts

import { createStuff } from './createStuff';

test('Describe your test', () => {

});
```

If you need to use the Figma Plugin API, you can reference it using an API stub.

```js
import { createFigma } from 'figma-api-stub';

const figma = createFigma({});
```

Follow the [Jest Docs](https://jestjs.io/docs/getting-started) for more guidance on writing tests.

Finally to see if you're test passes, run:

```bash
npm run test
```
