require('dotenv').config()
const pkg = require('./package')
const devConfig = require('./webpack/webpack.config.dev')

module.exports = {
  mode: 'universal',
  srcDir: 'src/',

  /*
  ** Environmental Variables
  */
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    SENTRY_DSN: process.env.SENTRY_DSN
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: pkg.description }],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        re: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Merriweather'
      },
      {
        re: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=M+PLUS+1p'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#b38639' },

  /*
  ** Global CSS
  */
  css: ['~/assets/css/app.css', '~/assets/css/prism.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/pwa', '@nuxtjs/google-analytics', '@nuxtjs/sentry'],

  /*
  ** Extensions
  */
  extensions: ['ts', 'js'],

  /*
  ** PWA settings
  */
  workbox: {
    importScripts: ['main-sw.js']
  },

  /*
   * Google Analytics settings
   */
  'google-analytics': {
    id: 'UA-129690358-1'
  },

  /*
   * Sentry settings
   */
  sentry: {
    dsn: process.env.SENTRY_DSN
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      if (true || ctx.isDev) {
        devConfig(config)
        return
      }
    }
  }
}
