import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { webUpdateNotice } from '@plugin-web-update-notification/vite';
import eslint from 'vite-plugin-eslint';
import StylelintPlugin from 'vite-plugin-stylelint';
import Inspect from 'vite-plugin-inspect';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    laravel(['resources/css/app.css', 'resources/js/app.js']),
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
    eslint({
      cache: true,
      fix: true,
      lintOnStart: false,
      emitWarning: true,
      emitError: true,
      failOnWarning: false,
      failOnError: true,
    }),
    StylelintPlugin({
      fix: true,
      quite: true,
      lintOnStart: false,
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
      polyfills: true,
    }),
    Inspect(),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules'),
      '@': path.resolve(__dirname, 'resources/js'),
      '@views': path.resolve(__dirname, 'resources/js/views'),
      '@pages': path.resolve(__dirname, 'resources/js/views'),
      '@store': path.resolve(__dirname, 'resources/js/store'),
      '@router': path.resolve(__dirname, 'resources/js/router'),
      // '@pages': path.resolve(__dirname, 'resources/js/views/pages'),
      '@components': path.resolve(__dirname, 'resources/js/components'),
    },
  },
});
