import globals from 'globals';
import jsEslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import vueEslint from 'vue-eslint-parser';
// Import plugins
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginStorybook from 'eslint-plugin-storybook';
import pluginUnicorn from 'eslint-plugin-unicorn';
import pluginVue from 'eslint-plugin-vue';

/** @type {import('typescript-eslint').InfiniteDepthConfigWithExtends} */
const eslintConfig = tsEslint.config(
  // Base configuration
  jsEslint.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    plugins: {
      import: pluginImport,
      unicorn: pluginUnicorn,
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
    files: ['**/*.{ts,mts,tsx,vue}'],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        extraFileExtensions: ['.vue'], // vue 파일 확장자 추가
      },
    },
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
    plugins: { prettier: pluginPrettier },
    rules: {
      'prettier/prettier': 'off', // Disable Prettier rules to avoid conflicts with other formatting tools
    },
  },

  // Storybook specific configuration
  {
    files: ['**/*.stories.@(ts|tsx)'],
    extends: [pluginStorybook.configs['flat/recommended']],
    rules: {
      'storybook/csf-component': 'error',
      'storybook/prefer-pascal-case': 'warn',
    },
  },

  // Vue.js specific configuration
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueEslint,
      parserOptions: {
        parser: tsEslint.parser,
      },
      globals: globals.browser,
    },
    plugins: { vue: pluginVue },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/require-component-is': 'error',
    },
  },
);

export default eslintConfig;
