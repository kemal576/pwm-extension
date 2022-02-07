import type { Configuration } from 'webpack';

module.exports = {
  entry: { background: 'src/background.ts', foreground: 'src/foreground.ts'},
} as Configuration;