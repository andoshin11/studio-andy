const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
module.exports = (baseConfig, env, config) => {
  config.resolve.extensions.push('.tsx')
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: ['\\.vue$'],
          transpileOnly: true
        }
      }
    ],
    exclude: /node_modules/
  })
  config.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, '../tsconfig.json')
    })
  )
  config.resolve.alias['@'] = path.join(__dirname, '../src')
  return config
}
