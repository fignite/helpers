# Contributing

We welcome your contributions to this library! This document outlines the guidelines and instructions for contributing to the project.

## Development Setup

Before you begin, ensure you have the following prerequisites:

- Node.js (latest LTS version recommended)
- pnpm package manager
- Figma desktop app (for testing)

1. Clone the repository:

    ```bash
    git clone https://github.com/fignite/helpers.git
    cd helpers
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

## Creating a New Helper

To contribute a new helper, follow these steps:

1. Create a new file in `packages/helpers/src`
    - Use a descriptive name that reflects the helper's functionality
    - Follow the existing file naming convention
2. Add your helper to the exports in `packages/helpers/src/index.ts`
3. Test your implementation (see [Testing Your Helper](#testing-your-helper))

## Testing Your Helper

### Local Development

1. Start the helpers package development server:

    ```bash
    cd packages/helpers
    pnpm dev
    ```

2. In a new terminal, start the sandbox plugin:

    ```bash
    cd ../../test/sandbox
    pnpm dev
    ```

### Testing in Figma

1. Import the sandbox plugin in Figma:

    - Open a Figma file
    - Use Quick Actions (⌘/ or Ctrl+/)
    - Search for "Import plugin from manifest..."
    - Select the `manifest.json` file from `test/sandbox/dist`

2. Test your helper's functionality in the sandbox plugin:
    - Verify all features work as expected
    - Test edge cases and error handling
    - Ensure the helper is performant

For more details about the sandbox plugin, see the instructions in the `test/sandbox` directory.

## Submitting Changes

The maintainers will review your pull request and provide feedback if needed. Once approved, your helper will be merged into the library.
