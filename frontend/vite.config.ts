import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), wasm(), topLevelAwait()],
    server: { port: 3000 },
    preview: { port: 3000 },
    resolve: {
        alias: {
            '@docAi-app': path.resolve(__dirname, './src'),
        },
    },
});
