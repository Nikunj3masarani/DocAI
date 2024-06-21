import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import fs from 'fs';
import https from 'https';

//Added certificates path

// Read certificate files
const certificate = fs.readFileSync('./insight360_basf_net.crt');
const privateKey = fs.readFileSync('./insight360.basf.net.key');
const ca = fs.readFileSync('./insight360.basf.net.key');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), wasm(), topLevelAwait()],
    server: {
        port: 3000,
        https: {
            key: privateKey,
            cert: certificate,
            ca: ca,
        },
    },
    preview: { port: 3000 },
    resolve: {
        alias: {
            '@docAi-app': path.resolve(__dirname, './src'),
        },
    },
});
