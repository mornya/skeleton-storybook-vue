import jsEslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
// Import plugins
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import storybookPlugin from 'eslint-plugin-storybook';
import unicornPlugin from 'eslint-plugin-unicorn';
import vuePlugin from 'eslint-plugin-vue';

/** @type {import('typescript-eslint').InfiniteDepthConfigWithExtends} */
const eslintConfig = tsEslint.config(
  // Base configuration
  jsEslint.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
  },
  {
    plugins: {
      import: importPlugin,
      unicorn: unicornPlugin,
    },
  },
  {
    ignores: ['coverage', 'dist', 'node_modules', 'public', 'src/assets', '*.config.*'],
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    extends: [tsEslint.configs.disableTypeChecked],
  },

  // TypeScript specific rules
  {
    files: ['**/*.{ts,mts,tsx}'],
    rules: {
      'import/extensions': ['off'],
      'import/named': ['off'],
      'import/newline-after-import': ['off'],
      'import/no-cycle': ['off'],
      'import/no-duplicates': ['error'],
      'import/no-extraneous-dependencies': ['off'],
      'import/order': ['off'],
      'import/prefer-default-export': ['off'],
      '@typescript-eslint/block-spacing': ['off'],
      '@typescript-eslint/brace-style': ['off'],
      '@typescript-eslint/comma-dangle': ['off'],
      '@typescript-eslint/comma-spacing': ['off'],
      '@typescript-eslint/func-call-spacing': ['off'],
      '@typescript-eslint/indent': ['off'],
      '@typescript-eslint/key-spacing': ['off'],
      '@typescript-eslint/keyword-spacing': ['off'],
      '@typescript-eslint/lines-around-comment': [0],
      '@typescript-eslint/lines-between-class-members': ['off'],
      '@typescript-eslint/member-delimiter-style': ['off'],
      '@typescript-eslint/no-empty-function': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-extra-parens': ['off'],
      '@typescript-eslint/no-extra-semi': ['off'],
      '@typescript-eslint/no-unsafe-declaration-merging': ['off'],
      '@typescript-eslint/no-unused-vars': ['off'],
      '@typescript-eslint/no-use-before-define': ['off'],
      '@typescript-eslint/object-curly-spacing': ['off'],
      '@typescript-eslint/prefer-for-of': ['off'],
      '@typescript-eslint/prefer-nullish-coalescing': ['off'],
      '@typescript-eslint/prefer-optional-chain': ['off'],
      '@typescript-eslint/quotes': [0],
      '@typescript-eslint/semi': ['off'],
      '@typescript-eslint/space-before-blocks': ['off'],
      '@typescript-eslint/space-before-function-paren': ['off'],
      '@typescript-eslint/space-infix-ops': ['off'],
      '@typescript-eslint/type-annotation-spacing': ['off'],
      'unicorn/empty-brace-spaces': ['off'],
      'unicorn/escape-case': ['error'],
      'unicorn/no-nested-ternary': ['off'],
      'unicorn/number-literal-case': ['off'],
    },
  },

  // Prettier specific configuration
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'off', // Disable Prettier rules to avoid conflicts with other formatting tools
    },
  },

  // Storybook specific configuration
  storybookPlugin.configs['flat/recommended'],
  {
    files: ['**/*.stories.@(ts|tsx)'],
    rules: {
      'storybook/csf-component': 'error',
      'storybook/prefer-pascal-case': 'warn',
    },
  },

  // Vue.js specific configuration
  //vuePlugin.configs['flat/essential'], // Vue 3 Essential 규칙
  //{
  //  files: ['**/*.vue'],
  //  languageOptions: {
  //    ecmaVersion: 'latest',
  //    sourceType: 'module',
  //    globals: {
  //      defineProps: 'readonly',
  //      defineEmits: 'readonly',
  //      defineExpose: 'readonly',
  //      withDefaults: 'readonly',
  //    },
  //  },
  //  rules: {
  //    'vue/multi-word-component-names': 'off',
  //  },
  //},
);

export default eslintConfig;
