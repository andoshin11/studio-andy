// @ts-check
const path = require('path')

/**
 * @param {import('webpack').Configuration} config
 */
module.exports = config => {
  config.resolve.extensions.push('.ts', '.js', '.vue', '.tsx', '.css', '.html')

  const tsLoader = {
    loader: 'ts-loader',
    options: {
      appendTsSuffixTo: [/\.vue$/],
      transpileOnly: process.env.NODE_ENV === 'development' ? true : false
    }
  }

  // Add TypeScript loader
  config.module.rules.push({
    test: /((client|server)\.js)|(\.ts)$/,
    loader: 'ts-loader',
    options: {
      appendTsSuffixTo: [/\.vue$/],
      transpileOnly: process.env.NODE_ENV === 'development' ? true : false
    }
  })

  config.module.rules.push({
    test: /\.tsx$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: [['@babel/env', { modules: 'commonjs' }]],
          plugins: [
            'babel-plugin-vue-jsx-modifier',
            'babel-plugin-transform-vue-jsx',
            '@babel/plugin-syntax-dynamic-import',
            [
              '@babel/plugin-transform-runtime',
              {
                regenerator: true
              }
            ]
            // [
            //   "emotion",
            //   {
            //     autoLabel: true
            //   }
            // ]
          ]
        }
      },
      {
        loader: 'ts-loader',
        options: {
          appendTsxSuffixTo: ['\\.vue$'],
          transpileOnly: process.env.NODE_ENV === 'development' ? true : false
        }
      }
    ]
  })

  // Add TypeScript loader for vue files
  for (let rule of config.module.rules) {
    if (rule.loader === 'vue-loader') {
      rule.options['loaders'] = {
        ...rule.options['loaders'],
        ts: tsLoader
      }
    }
  }

  if (process.env.NODE_ENV === 'development') {
    const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
    config.plugins.push(
      new ForkTsCheckerWebpackPlugin({
        workers: 2,
        vue: true
      })
    )
  }

  // Add alias
  config.resolve.alias['~'] = path.resolve(__dirname, 'src')

  return config
}
