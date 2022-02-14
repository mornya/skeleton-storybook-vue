const path = require('path');
const { Log } = require('@mornya/cli-libs');

// 경로 선언
const appPath = {
  root: path.resolve(__dirname, '..'),
  public: path.resolve(__dirname, '..', 'public'),
  src: path.resolve(__dirname, '..', 'src'),
  stories: path.resolve(__dirname, '..', 'stories'),
  node_modules: path.resolve(__dirname, '..', 'node_modules'),
};

/** @type {import('@storybook/core-common').StorybookConfig} */
module.exports = {
  staticDirs: [appPath.public],
  stories: [
    `${appPath.stories}/**/*.@(ts|tsx|js|jsx|mdx)`,
    `${appPath.src}/**/*.stories.@(ts|tsx|js|jsx|mdx)`,
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-scss',
  ],
  framework: '@storybook/vue',
  core: {
    'builder': 'webpack5',
  },
  webpackFinal: async (config) => {
    config.resolve.alias['@'] = appPath.src;
    config.resolve.alias['~'] = appPath.root;
    config.resolve.alias['@@'] = appPath.src;
    config.resolve.alias['~~'] = appPath.root;

    // 타입 체커 실행
    const eslintConfig = {};
    try {
      eslintConfig.eslintOptions = require(`${appPath.node_modules}/.cache/lintest/info.json`).eslintOptions;
      eslintConfig.eslint = true;
    } catch (e) {
      Log.failure('@lintest/cli was not installed or have to run "lintest install"!');
    }

    /** @type {import('fork-ts-checker-webpack-plugin/lib/ForkTsCheckerWebpackPluginOptions').ForkTsCheckerWebpackPluginOptions} */
    const nextOption = {
      async: true,
      typescript: {
        enabled: true,
        configFile: `${appPath.root}/tsconfig.json`,
      },
      // dev 빌드시 eslint 룰셋 적용한 lint 실행
      eslint: !!eslintConfig ? {
        enabled: true,
        files: [
          `${appPath.src}/**/*.{ts,tsx,js,jsx}`,
          `${appPath.stories}/**/*.stories.{ts,tsx,js,jsx}`,
        ],
        options: eslintConfig.eslintOptions || {},
      } : {},
    };
    const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

    config.plugins = config.plugins
      .filter(plugin => !(
        plugin instanceof ForkTsCheckerWebpackPlugin
      ));
    config.plugins.push(new ForkTsCheckerWebpackPlugin(nextOption));

    return config;
  },
};
