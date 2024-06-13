import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            '@': fileURLToPath(
                new URL('./src', import.meta.url),
            ),
        },
    },
    server: {
        host: '0.0.0.0',
        open: true,
        cors: true,
        proxy: {
            '/api': {
                target: 'http://ceshi13.dishait.cn',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
