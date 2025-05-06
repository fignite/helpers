import typescript from '@rollup/plugin-typescript';

const config = {
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
};

export default config;
