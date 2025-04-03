import { defineConfig, splitVendorChunkPlugin, loadEnv } from 'vite';
import laravel, { refreshPaths } from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path, { resolve, dirname } from 'path';
import tailwindcss from '@tailwindcss/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { imagetools } from 'vite-imagetools';
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { createHtmlPlugin } from 'vite-plugin-html';
import manifestSRI from 'vite-plugin-manifest-sri';
import legacy from '@vitejs/plugin-legacy';
import viteEsLintPlugin from 'vite-plugin-eslint';
import StylelintPlugin from 'vite-plugin-stylelint';
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs';

export default defineConfig({
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      plugins: [esbuildCommonjs()],
    },
  },
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.js'],
      reactivityTransform: true,
      refresh: true,
    }),
    vue({
      reactivityTransform: true,
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
    // tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: 'resources/img/favicon/*',
          dest: '../',
        },
        {
          src: 'resources/pwa/*',
          dest: '../',
        },
      ],
    }),
    imagetools({
      cache: {
        enabled: true,
        dir: './node_modules/.cache/imagetools',
        retention: 172800,
      },
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
      polyfills: true,
    }),
    manifestSRI(),
    createHtmlPlugin({
      minify: true,
      entry: path.resolve(__dirname, 'resources/js/app.js'),
    }),
    ViteMinifyPlugin({
      minifyCSS: true,
      removeComments: true,
    }),
    StylelintPlugin({
      fix: true,
      quite: false,
      lintOnStart: true,
    }),
    viteEsLintPlugin({
      include: '/.(js|vue)$/',
      cache: true,
      fix: true,
      lintOnStart: false,
      emitWarning: true,
      emitError: true,
      failOnWarning: false,
      failOnError: true,
    }),
    viteCommonjs(),
    splitVendorChunkPlugin(),
    manualChunksPlugin(),
  ],
  build: {
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1600,
    // manifest: "manifest.json",
    // sourcemap: process.env.VITE_APP_ENV == 'local' ? true : false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const modulePath = id.split('node_modules/')[1];
            const topLevelFolder = modulePath.split('/')[0];
            if (topLevelFolder !== '.pnpm') {
              return topLevelFolder;
            }
            const scopedPackageName = modulePath.split('/')[1];
            const chunkName = scopedPackageName.split('@')[scopedPackageName.startsWith('@') ? 1 : 0];
            return chunkName;
          }
        },
      },
    },
    modulePreload: {
      polyfill: true,
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules'),
      '@': path.resolve(__dirname, 'resources/js'),
      '@css': path.resolve(__dirname, 'resources/css'),
      '@img': path.resolve(__dirname, 'resources/img'),
      '@views': path.resolve(__dirname, 'resources/js/views'),
      '@pages': path.resolve(__dirname, 'resources/js/views/pages'),
      '@layouts': path.resolve(__dirname, 'resources/js/layouts'),
      '@kiosk': path.resolve(__dirname, 'resources/js/views/kiosk'),
      '@home': path.resolve(__dirname, 'resources/js/views/home'),
      '@admin': path.resolve(__dirname, 'resources/js/views/admin'),
      '@auth': path.resolve(__dirname, 'resources/js/views/auth'),
      '@errors': path.resolve(__dirname, 'resources/js/views/errors'),
      '@login': path.resolve(__dirname, 'resources/js/views/login'),
      '@misc': path.resolve(__dirname, 'resources/js/views/misc'),
      '@posts': path.resolve(__dirname, 'resources/js/views/posts'),
      '@category': path.resolve(__dirname, 'resources/js/views/category'),
      '@register': path.resolve(__dirname, 'resources/js/views/register'),
      '@store': path.resolve(__dirname, 'resources/js/store'),
      '@services': path.resolve(__dirname, 'resources/js/services'),
      '@router': path.resolve(__dirname, 'resources/js/router'),
      '@routes': path.resolve(__dirname, 'resources/js/routes'),
      '@components': path.resolve(__dirname, 'resources/js/components'),
      '@composables': path.resolve(__dirname, 'resources/js/composables'),
      vue: path.resolve(__dirname, 'node_modules/vue/dist/vue.esm-bundler.js'),
    },
  },
});
