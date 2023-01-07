import { defineConfig, splitVendorChunkPlugin, loadEnv, Plugin } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { webUpdateNotice } from '@plugin-web-update-notification/vite';
import eslint from 'vite-plugin-eslint';
import StylelintPlugin from 'vite-plugin-stylelint';
import Inspect from 'vite-plugin-inspect';
import legacy from '@vitejs/plugin-legacy';
import sentryVitePlugin from '@sentry/vite-plugin';
import Pages from 'vite-plugin-pages';
import generateSitemap from 'vite-plugin-pages-sitemap';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import viteImagemin from 'vite-plugin-imagemin';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import { visualizer } from 'rollup-plugin-visualizer';
import { createHtmlPlugin } from 'vite-plugin-html'
import manifestSRI from 'vite-plugin-manifest-sri';

const routes = () =>
  import(/* webpackChunkName: "jsRoutes" */ 'resources/js/router/routes.js');

const fs = require('node:fs');

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  let SentryPlugin = null;
  let devServer = null;
  let VisualizerPlugin = null;
  let InspectPlugin = null;

  if (process.env.VITE_SENTRY_IO_ENABLED == 1) {
    SentryPlugin = sentryVitePlugin({
      include: '.',
      ignore: ['node_modules', 'vite.config.ts'],
      silent: true,
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

  if (
    process.env.VITE_SERVER_ENABLED == true &&
    process.env.VITE_SERVER_SECURE == false
  ) {
    devServer = {
      host: process.env.VITE_SERVER_HOST,
    };
  }

  if (
    process.env.VITE_SERVER_ENABLED == true &&
    process.env.VITE_SERVER_SECURE == true
  ) {
    devServer = {
      https: {
        key: fs.readFileSync(process.env.VITE_SERVER_HTTPS_KEY),
        cert: fs.readFileSync(process.env.VITE_SERVER_HTTPS_CERT),
      },
      host: process.env.VITE_SERVER_HOST,
    };
  }

  if (process.env.VITE_APP_ENV == 'local') {
    VisualizerPlugin = visualizer({
      emitFile: true,
      filename: 'js-bundle-stats.html',
    });
    InspectPlugin = Inspect();
  }

  return defineConfig({
    optimizeDeps: {
      include: ['esm-dep > cjs-dep'],
      force: true,
    },
    build: {
      ssr: false,
      minify: 'terser',
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1600,
      manifest: true,
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id, { getModuleInfo }) {
            const match = /.*\.strings\.(\w+)\.js/.exec(id);
            if (match) {
              const language = match[1]; // e.g. "en"
              const dependentEntryPoints = [];

              // we use a Set here so we handle each module at most once. This
              // prevents infinite loops in case of circular dependencies
              const idsToHandle = new Set(getModuleInfo(id).dynamicImporters);

              for (const moduleId of idsToHandle) {
                const { isEntry, dynamicImporters, importers } = getModuleInfo(moduleId);
                if (isEntry || dynamicImporters.length > 0) dependentEntryPoints.push(moduleId);

                // The Set iterator is intelligent enough to iterate over elements that
                // are added during iteration
                for (const importerId of importers) idsToHandle.add(importerId);
              }

              // If there is a unique entry, we put it into a chunk based on the entry name
              if (dependentEntryPoints.length === 1) {
                return `${dependentEntryPoints[0].split('/').slice(-1)[0].split('.')[0]}.strings.${language}`;
              }
              // For multiple entries, we put it into a "shared" chunk
              if (dependentEntryPoints.length > 1) {
                return `shared.strings.${language}`;
              }
            }
          },
          globals: {
            vue: 'Vue',
          },
        },
        external: ['Vue'],
      },
      modulePreload: {
        polyfill: true,
      },
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: 'resources/img/favicon/favicon.ico',
            dest: '../',
          },
          {
            src: 'resources/img/favicon/favicon-32x32.png',
            dest: '../',
          },
          {
            src: 'resources/img/favicon/android-chrome-192x192.png',
            dest: '../',
          },
          {
            src: 'resources/img/favicon/android-chrome-512x512.png',
            dest: '../',
          },
          {
            src: 'resources/img/favicon/apple-touch-icon.png',
            dest: '../',
          },
          {
            src: 'resources/img/favicon/favicon-16x16.png',
            dest: '../',
          },
          {
            src: 'resources/img/favicon/favicon.ico',
            dest: '../',
          },
          {
            src: 'resources/img/favicon/favicon.ico',
            dest: '',
          },
          {
            src: 'resources/img/favicon/favicon-32x32.png',
            dest: '',
          },
          {
            src: 'resources/img/favicon/android-chrome-192x192.png',
            dest: '',
          },
          {
            src: 'resources/img/favicon/android-chrome-512x512.png',
            dest: '',
          },
          {
            src: 'resources/img/favicon/apple-touch-icon.png',
            dest: '',
          },
          {
            src: 'resources/img/favicon/favicon-16x16.png',
            dest: '',
          },
          {
            src: 'resources/img/favicon/favicon.ico',
            dest: '',
          },
        ],
      }),
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 20,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
            },
            {
              name: 'removeEmptyAttrs',
              active: false,
            },
          ],
        },
      }),
      laravel({
        input: ['resources/css/app.css', 'resources/js/app.js'],
        refresh: [{
            paths: ['resources/views/**', 'resources/css/**', 'resources/js/**', 'app/View/Components/**'],
            config: { delay: 300 }
        }],
      }),
      manifestSRI(),
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
      chunkSplitPlugin(),
      Pages({
        onRoutesGenerated: async (routes) => {
          generateSitemap({
            hostname: process.env.VITE_APP_NAME,
            routes: [...routes],
            readable: true,
            exclude: ['/admin'],
            allowRobots: false,
            filename: 'sitemap.xml',
          });
        },
      }),
      VitePWA({
        mode:
          process.env.VITE_APP_ENV.toLowerCase() == 'production'
            ? 'production'
            : 'development',
        // base: '/',
        // registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          cleanupOutdatedCaches: true,
          sourcemap: true,
        },
        includeAssets: [
          'favicon.ico',
          'apple-touch-icon.png',
          'favicon-16x16.png',
          'favicon-32x32.png',
        ],
        manifest: {
          name: process.env.VITE_APP_NAME,
          short_name: process.env.VITE_APP_SHORT_NAME,
          description: process.env.VITE_APP_DESC,
          theme_color: '#ffffff',
          icons: [
            {
              src: 'android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
        devOptions: {
          enabled:
            process.env.VITE_APP_ENV.toLowerCase() == 'production'
              ? false
              : true,
          type: 'module',
          navigateFallback: 'index.html',
        },
      }),
      createHtmlPlugin({
        minify: true,
        entry: 'resources/js/app.js',
      }),
      SentryPlugin,
      InspectPlugin,
      VisualizerPlugin,
    ],
    sourcemap: true,
    server: devServer,
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
