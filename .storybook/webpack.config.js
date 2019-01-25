const path = require('path')
module.exports = (baseConfig, env, config) => {
  config.resolve.extensions.push('.ts')
  config.module.rules.push({
    test: /\.ts$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: ['\\.vue$']
        }
      }
    ],
    exclude: /node_modules/
  })
  config.resolve.alias['@'] = path.join(__dirname, '../src')
  return config
}
