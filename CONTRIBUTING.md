# Contributing

We welcome your contributions to this library, please read the below to see how you can help.


## New helpers

To contribute a helper to the library please fork the `main` branch, follow the steps below and raise a pull request. If you need any help just let us know in your pull request.
 
1. Create a file for your helper in `src/helpers/`
2. Create a unit test in `__tests__`
3. Test that it works (see below)


### Creating a unit test

Create a unit test by making a file with the same name as the helper in the `__tests__` directory. Use *Jest's* built-in `test()` function to create a test.

```js
// __tests__/myHelper.test.ts

import { myHelper } from './src/helpers/myHelper';

test('Describe your test', () => {
    
});
```

Unit tests use a global Figma API stub and can just be referenced as normal

```js
// __tests__/myHelper.test.ts

var rect = figma.createRectangle()
```

Follow the [Jest Docs](https://jestjs.io/docs/getting-started) for more guidance on writing tests.

Finally to see if your test passes, run.

```bash
npm run test myHelper
```

Add the flag `--watch` to watch for changes.

If it's difficult or not possible to create a unit test, please leave a placeholder with a comment.

```js
// __tests__/myHelper.test.ts

// Not possible to create an accurate test because Figma Stub API doesn't support getters and setters

test.todo(`Does some cool stuff with rectangles`)
```

### Testing locally

To test your helper works locally you can use `npm link`.

First create a link from your fork of `@fignite/helpers` and run the dev command.

```bash
cd ~/Sites/fignite-helpers
npm link
npm run dev
```

Then in your own project import the helper and check that it works by linking it locally.

```js
// ~/Sites/myPlugin/code.ts

import { myHelper } from '@fignite/helpers'

// ...

myHelper()
```

Linking locally

```bash
cd ~/Sites/myPlugin
npm link @fignite/helpers
```
