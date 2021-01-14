const fs = require('fs')
const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'
const appPath = {
  src: path.resolve(__dirname, '..', 'src'),
  node_modules: path.resolve(__dirname, '..', 'node_modules'),
  tsconfig: path.resolve(__dirname, '..', 'tsconfig.json'),
}
const hasLintest = fs.existsSync('./lintest.config.js')

module.exports = {
  addons: [
    // 순서 주의
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
  ],
  stories: [
    `${appPath.src}/**/*.stories.@(ts|tsx|js|jsx|mdx)`,
  ],
  webpackFinal: async (config) => {
    config.resolve.alias['~'] = appPath.src
    config.resolve.alias['@'] = appPath.src

    config.module.rules.push({
      test: /\.[tj]sx?$/,
      include: [appPath.src],
      exclude: [appPath.node_modules],
      use: [
        {
          loader: 'ts-loader',
          options: {
            configFile: appPath.tsconfig,
            appendTsSuffixTo: [/\.vue$/], // .vue
            transpileOnly: true, // used with ForkTsCheckerWebpackPlugin
            allowTsInNodeModules: true,
            logLevel: 'warn', // info, warn, error
            silent: true,
            colors: true,
          },
        },
      ],
    })
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'resolve-url-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true, // resolve-url-loader를 위해 항상 true
            sassOptions: {
              prependData: `@import "~@/assets/scss/variables";`.trim(),
              includePaths: [appPath.src, appPath.node_modules],
              indentedSyntax: false, // scss must disabled
              sourceComments: false,
            },
          },
        },
      ],
    })

    if (!isProduction) {
      // lintest.config.js 존재시 타입 체커 실행
      if (hasLintest) {
        const os = require('os')
        const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin') // for lintest
        const totalMem = Math.floor(os.totalmem() / 1048576) // get OS mem size as MB (totalMem/1024/1024)
        const memoryLimit = totalMem > 4096 ? 2048 : 1024
        const eslintConfig = {}

        try {
          // current __dirname is ".storybook"
          eslintConfig.eslintOptions = require('../node_modules/.cache/lintest/info.json').eslintOptions
          eslintConfig.eslint = true

          // fork-ts-checker-webpack-plugin@5 options
          const nextOption = {
            async: true,
            typescript: {
              enabled: true,
              configFile: 'tsconfig.json',
              memoryLimit,
            },
            eslint: !isProduction && !!eslintConfig && {
              enabled: true,
              files: [`${appPath.src}/**/*.{vue,ts,tsx,js,jsx}`],
              options: eslintConfig.eslintOptions || {},
              memoryLimit,
            },
          }

          //config.plugins = config.plugins.filter(plugin => !(plugin instanceof ForkTsCheckerWebpackPlugin))
          config.plugins.push(new ForkTsCheckerWebpackPlugin(nextOption))
        } catch (e) {
          console.log('@lintest/cli was not installed or have to run "lintest install"!')
        }
      } else {
        console.log('No lintest configuration found.')
      }
    }

    return config
  },
}
