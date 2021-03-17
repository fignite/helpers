# Figlets
A collection of helpers for Figma plugins

## Testing

For each helper create a unit test by making a file with the same name as the helper in the `__tests__` directory. Use *Jest's* built-in `test()` function to create a test.

```js
// __tests__/createRectangles.test.ts

import { createStuff } from './createStuff';

test('Describe your test', () => {
    
});
```

Unit tests use a global Figma API stub and can just be referenced as normal

```js
// __tests__/createRectangles.test.ts

var rect = figma.createRectangle()
```

Follow the [Jest Docs](https://jestjs.io/docs/getting-started) for more guidance on writing tests.

Finally to see if your test passes, run:

```bash
npm run test
```
