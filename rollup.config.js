import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        dir: './build',
        entryFileNames: '[name].cjs.js',
        sourcemap: true,
        format: 'cjs',
      },
      {
        dir: './build',
        entryFileNames: '[name].js',
        sourcemap: true,
        format: 'iife',
        name: 'RandomPasswordGenerator',
      },
    ],
    plugins: [
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
    ],
  },
];
