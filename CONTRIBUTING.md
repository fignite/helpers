# Contributing

We welcome your contributions to this library, please read the below to see how you can help.

## New helpers

To contribute a helper to the library please fork the `main` branch, follow the steps below and raise a pull request. If you need any help just let us know in your pull request.

1. Create a file for your helper in `packages/helpers/src`
2. Add your helper to the `src/index.ts` file
3. Test that it works (see below)

### Developing

### Testing locally

To test your helper works locally you can use the sandbox.

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
