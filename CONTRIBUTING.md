# Contributing

We welcome your contributions to this library, please read the below to see how you can help.

## New helpers

To contribute a helper to the library please fork the `main` branch, follow the steps below and raise a pull request.

### Testing locally

To test your helper works locally:

1. Navigate to the helpers package directory:

    ```bash
    cd packages/helpers
    ```

2. Start the development server:

    ```bash
    pnpm dev
    ```

3. In a new terminal, navigate to the sandbox plugin directory and start its development server:

    ```bash
    cd ../../test/sandbox
    pnpm dev
    ```

4. Import the sandbox plugin in Figma:

    - Open a file in Figma
    - Search for "Import plugin from manifest..." using the Quick Actions bar
    - Choose the `manifest.json` file from the `test/sandbox/dist` folder

5. You can now use your helper in the sandbox plugin to test its functionality.

For more details about the sandbox plugin, see the instructions in the `test/sandbox` package.

### Raising a Pull Request

Once you've tested your helper and confirmed it works as expected, raise a pull request against the `main` branch. We'll review your pull request and provide feedback if needed. Once approved, your helper will be merged into the library.
