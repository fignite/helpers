# Figlets Helpers

A collection of helpers for Figma plugins.

## Usage

Install using the following

```bash
npm install @figlets/helpers
```

Include in your `main` code

```js
import { ungroup } from '@figlets/helpers'
```

## Testing

For each helper create a unit test by making a file with the same name as the helper in the `__tests__` directory. Use *Jest's* built-in `test()` function to create a test.

```js
// __tests__/ungroup.test.ts

import { ungroup } from './src/helpers/ungroup';

test('Describe your test', () => {
    
});
```

Unit tests use a global Figma API stub and can just be referenced as normal

```js
// __tests__/createRectangle.test.ts

var rect = figma.createRectangle()
```

Follow the [Jest Docs](https://jestjs.io/docs/getting-started) for more guidance on writing tests.

Finally to see if your test passes, run:

```bash
npm run test
```

## Publishing

Install `np` for publishing.

```
npm install --global np
```

Publish by running `np`

```
np
```
