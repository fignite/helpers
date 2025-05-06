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
			exports: 'named',
			strict: true,
		},
	],
	plugins: [
		typescript({
			tsconfig: './tsconfig.json',
			compilerOptions: {
				module: 'ESNext',
				target: 'ES2020',
			},
		}),
	],
	external: ['@figma/plugin-typings'],
};

export default config;
