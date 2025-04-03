import { defineConfig } from 'eslint/config';
import pluginVue from 'eslint-plugin-vue';

export default defineConfig([
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['resources/js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {
      semi: ['error', 'always'],
      'prefer-const': 'warn',
      'no-unused-vars': 'warn',
      'vue/multi-word-component-names': 'warn',
      'vue/require-v-for-key': 'warn',
      'vue/one-component-per-file': 'warn',
      'vue/no-reserved-component-names': 'warn',
      'vue/no-unused-vars': 0,
      'vue/html-self-closing': 0,
      '@typescript-eslint/no-empty-function': 0,
      'no-useless-catch': 0,
      '@typescript-eslint/no-unused-vars': 0,
      'vue/no-unused-components': 0,
      'vue/require-explicit-emits': 0,
      'no-undef': 0,
    },
  },
]);
