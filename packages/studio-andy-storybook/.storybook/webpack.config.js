const path = require('path')
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
  config.resolve.alias['@'] = path.join(__dirname, '../src')
  return config
}
