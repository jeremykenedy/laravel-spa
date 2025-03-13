module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:vue/vue3-essential",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
    "plugin:storybook/recommended"
    // "airbnb-base"
  ],
  globals: {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
    "ga": true
  },
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
    ecmaFeatures : {
      jsx : false
    }
  },
  parser: "babel-eslint",
  plugins: ["js", "vue", "html", "prettier"],
  ignorePatterns: ["**/node_modules", "**/vendor"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // override/add rules settings here, such as:
    'vue/no-unused-vars': 0,
    "vue/multi-word-component-names": 0,
    "vue/html-self-closing": 0,
    "no-unused-vars": 0,
    "@typescript-eslint/no-empty-function": 0,
    "no-useless-catch": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "vue/no-unused-components": 0,
    "vue/require-explicit-emits": 0,
    "@typescript-eslint/no-this-alias": 0,
    "no-undef": 0
  }
};
