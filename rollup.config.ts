import type { RollupOptions } from 'rollup';
import typescript from '@rollup/plugin-typescript';

const config: Array<RollupOptions> = [
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
    plugins: [typescript()],
  },
];

export default config;
