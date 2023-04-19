# fignite/helpers

A collection of helpers for Figma plugins and widgets.

## Usage

Install using the following

```bash
npm install @fignite/helpers
```

Include in your `main` code

```js
import { ungroup } from '@fignite/helpers'
```

## Type definitions

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
```

## Contributing

If you'd like to contribute, please see the [contributing](/CONTRIBUTING.md) guidelines.
