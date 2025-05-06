import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const config = [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.js',
                format: 'esm',
                sourcemap: true,
            },
            {
                file: 'dist/index.cjs',
                format: 'cjs',
                sourcemap: true,
            },
        ],
        plugins: [
            typescript({
                tsconfig: './tsconfig.json',
            }),
        ],
        external: ['@figma/plugin-typings'],
    },
    {
        input: 'dist/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        plugins: [dts()],
    },
];

export default config;
