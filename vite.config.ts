import { defineConfig, splitVendorChunkPlugin } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { webUpdateNotice } from '@plugin-web-update-notification/vite';
import eslint from 'vite-plugin-eslint';
import StylelintPlugin from 'vite-plugin-stylelint';
import Inspect from 'vite-plugin-inspect';
import legacy from '@vitejs/plugin-legacy';
const fs = require('node:fs');

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.js'],
      refresh: true,
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
    webUpdateNotice({
      logVersion: true,
      logHash: true,
      checkInterval: 0.5 * 60 * 1000,
      notificationProps: {
        title: 'system update',
        description: 'System update, please refresh the page',
        buttonText: 'refresh',
      },
    }),
    StylelintPlugin({
      fix: false,
      quite: true,
      lintOnStart: false,
    }),
    eslint({
      cache: true,
      fix: true,
      lintOnStart: false,
      emitWarning: true,
      emitError: true,
      failOnWarning: false,
      failOnError: true,
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
      polyfills: true,
    }),
    splitVendorChunkPlugin(),
    Inspect(),
  ],
  server: {
    https: {
      key: fs.readFileSync(
        '/Users/jeremykenedy/.config/valet/Certificates/laravel-secret-messages.test.key',
      ),
      cert: fs.readFileSync(
        '/Users/jeremykenedy/.config/valet/Certificates/laravel-secret-messages.test.crt',
      ),
    },
    host: 'laravel-secret-messages.test',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules'),
      '@': path.resolve(__dirname, 'resources/js'),
      '@img': path.resolve(__dirname, 'resources/img'),
      '@views': path.resolve(__dirname, 'resources/js/views'),
      '@pages': path.resolve(__dirname, 'resources/js/views/pages'),
      '@store': path.resolve(__dirname, 'resources/js/store'),
      '@services': path.resolve(__dirname, 'resources/js/services'),
      '@router': path.resolve(__dirname, 'resources/js/router'),
      '@components': path.resolve(__dirname, 'resources/js/components'),
    },
  },
});
