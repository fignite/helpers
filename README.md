# @fignite/helpers

A collection of helpers for Figma plugins and widgets.

## Install

Install using the following.

```bash
npm install @fignite/helpers
```

## Usage

Include helpers in your `main` code.

```js
// main.ts

import { getPageNode } from '@fignite/helpers'

figma.on('selectionchange', () => {
    const selection = figma.currentPage.selection
    if (selection.length === 0) return

    const pageNode = getPageNode(selection[0])

    console.log(pageNode)
})
```

You can see a list of the helpers inside [packages/helpers/src](/packages/helpers/src).

<!-- ## Type definitions

Update `tsconfig.json` to point to the type definitions.

```jsonc
{
    "compilerOptions": {
        // ...
        "typeRoots": [
            "./node_modules/@fignite",
            // ...
        ],
    },
}
``` -->

## Contributing

If you'd like to contribute, please see the [contributing](/CONTRIBUTING.md) guidelines.
