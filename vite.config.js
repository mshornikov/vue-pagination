import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import browserslistToEsbuild from 'browserslist-to-esbuild';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        emptyOutDir: true,
        cssMinify: true,
        minify: true,
        target: browserslistToEsbuild(),
        cssTarget: browserslistToEsbuild(),
        modulePreload: false,
        rollupOptions: {
            plugins: [
                eslint({
                    throwOnError: true,
                }),
            ],
        },
    },
    css: {
        devSourcemap: true,
        postcss: {
            plugins: [autoprefixer(), postcssPresetEnv()],
        },
    },
});
