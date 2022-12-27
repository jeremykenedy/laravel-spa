import { defineConfig, splitVendorChunkPlugin, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { webUpdateNotice } from '@plugin-web-update-notification/vite';
import eslint from 'vite-plugin-eslint';
import StylelintPlugin from 'vite-plugin-stylelint';
import Inspect from 'vite-plugin-inspect';
import legacy from '@vitejs/plugin-legacy';
import sentryVitePlugin from '@sentry/vite-plugin';
const fs = require('node:fs');

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  let SentryPlugin = null;
  if (process.env.VITE_SENTRY_IO_ENABLED == 1) {
    SentryPlugin = sentryVitePlugin({
      include: '.',
      ignore: ['node_modules', 'vite.config.ts'],
      silent: false,
      telemetry: true,
      sourceMapReference: false,
      sourceMaps: {
        include: ['./public/build/assets'],
        ignore: ['node_modules'],
        urlPrefix: '~/assets',
      },
      deploy: {
        env: process.env.VITE_APP_ENV,
      },
      org: process.env.VITE_SENTRY_ORG,
      project: process.env.VITE_SENTRY_PROJECT,
      authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
    });
  }

  return defineConfig({
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
        fix: true,
        quite: false,
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
      SentryPlugin,
    ],
    sourcemap: true,
    server: {
      https: {
        key: fs.readFileSync(process.env.VITE_SERVER_HTTPS_KEY),
        cert: fs.readFileSync(process.env.VITE_SERVER_HTTPS_CERT),
      },
      host: process.env.VITE_SERVER_HOST,
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'node_modules'),
        '@': path.resolve(__dirname, 'resources/js'),
        '@css': path.resolve(__dirname, 'resources/css'),
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
};
