import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './src/index.ts',
  output: {
    dir: './dist',
    entryFileNames: '[name].js',
    sourcemap: true,
    format: 'cjs',
  },
  plugins: [
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
};
