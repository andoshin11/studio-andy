// @ts-check
const path = require('path')

/**
 * @param {import('webpack').Configuration} config
 */
module.exports = config => {
  config.resolve.extensions.push('.ts', '.js', '.vue', '.css', '.html')

  const tsLoader = {
    loader: 'ts-loader',
    options: {
      appendTsSuffixTo: [/\.vue$/],
      transpileOnly: process.env.NODE_ENV === 'development' ? true : false
    }
  }

  // Add TypeScript loader
  config.module.rules.push(
    Object.assign(
      {
        test: /((client|server)\.js)|(\.tsx?)$/
      },
      tsLoader
    )
  )

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
