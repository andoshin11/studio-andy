const path = require('path')

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
      rule.options.loaders = {
        ...rule.options.loaders,
        ts: tsLoader
      }
    }
  }

  // Add alias
  config.resolve.alias['~'] = path.resolve(__dirname, 'src')

  return config
}
