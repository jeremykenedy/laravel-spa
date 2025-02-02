import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/css/app.css',
        'resources/js/app.js',
      ],
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
        retention: 172800
      }
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1600,
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
      '@composables': path.resolve(__dirname, 'resources/js/composables'),
      vue: path.resolve(__dirname, 'node_modules/vue/dist/vue.esm-bundler.js'),
    },
  }
});
