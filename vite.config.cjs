const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

// Vite config in CJS to avoid ESM/esbuild load in restricted environments
module.exports = defineConfig({
  plugins: [react()],
});
