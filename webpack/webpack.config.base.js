const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = config => {
  config.resolve.extensions.push('.ts', '.js', '.vue', '.css', '.html')

  const tsLoader = {
    loader: 'ts-loader',
    options: {
      appendTsSuffixTo: [/\.vue$/],
      transpileOnly: true
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
      rule.options.loaders = {
        ...rule.options.loaders,
        ts: tsLoader
      }
    }
  }

  config.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      workers: 2,
      vue: true
    })
  )

  // Add alias
  config.resolve.alias['~'] = path.resolve(__dirname, '../src')

  return config
}
