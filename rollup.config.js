import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
// import dts from 'rollup-plugin-dts' // Bundles type declarations
// import typescript from 'rollup-plugin-typescript';
import typescript from 'rollup-plugin-typescript2';
// import ts from 'rollup-plugin-ts';

// rollup-plugin-typescript doesn't output type declarations so using rollup-plugin-typescript2 for now


export default {
    input: 'src/index.ts',
    output: {
        format: 'cjs',
        file: 'dist/index.js'
    },
    plugins: [
        typescript({exclude: ["/__tests__"]})
    ]
};