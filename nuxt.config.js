require('dotenv').config()
const pkg = require('./package')
const path = require('path')
const configFile = require('./webpack.config')

module.exports = {
  mode: 'universal',
  srcDir: 'src/',
  modulesDir: path.resolve(__dirname, 'node_modules'),

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
      { rel: 'apple-touch-icon', size: '57x57', href: '/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', size: '60x60', href: '/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', size: '72x72', href: '/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', size: '76x76', href: '/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', size: '114x114', href: '/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', size: '120x120', href: '/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', size: '144x144', href: '/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', size: '152x152', href: '/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', size: '180x180', href: '/apple-icon-180x180.png' },
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
  loading: { color: '#ef6530' },

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
  modules: ['@nuxtjs/sitemap', '@nuxtjs/pwa', '@nuxtjs/google-analytics', '@nuxtjs/sentry', '@nuxtjs/feed'],

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

  manifest: {
    short_name: 'Studio Andy',
    name: 'Studio Andy',
    icons: [
      {
        src: 'launcher-icon-1x.png',
        type: 'image/png',
        sizes: '48x48'
      },
      {
        src: 'launcher-icon-2x.png',
        type: 'image/png',
        sizes: '96x96'
      },
      {
        src: 'launcher-icon-4x.png',
        type: 'image/png',
        sizes: '192x192'
      },
      {
        src: 'launcher-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    background_color: '#ef6530',
    start_url: '/?launcher=true',
    display: 'minimal-ui'
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
   * Sitemap settings
   */
  sitemap: {
    hostname: 'https://blog.andoshin11.me',
    exclude: ['/search'],
    async routes() {
      const contentful = require('contentful')
      const client = contentful.createClient({
        space: process.env.CTF_SPACE_ID,
        accessToken: process.env.CTF_CDA_ACCESS_TOKEN
      })

      const posts = await client.getEntries({
        content_type: 'post',
        'fields.isPublished': true
      })
      return posts.items.map(item => `posts/${item.fields.slug}`)
    }
  },

  /*
   * RSS settings
   */
  feed: [
    {
      path: '/atom.xml',
      async create(feed) {
        feed.options = {
          title: 'Studio Andy',
          link: 'https://blog.andoshin11.me/feed.xml',
          description: "This is Shin Ando's personal feed!"
        }

        const contentful = require('contentful')
        const client = contentful.createClient({
          space: process.env.CTF_SPACE_ID,
          accessToken: process.env.CTF_CDA_ACCESS_TOKEN
        })

        const posts = await client.getEntries({
          content_type: 'post',
          'fields.isPublished': true
        })

        posts.items.forEach(post => {
          feed.addItem({
            title: post.fields.title,
            id: post.fields.slug,
            link: `https://blog.andoshin11.me/posts/${post.fields.slug}`,
            description: post.fields.summary,
            content: post.fields.summary,
            date: new Date(post.fields.publishedAt),
            image: post.fields.headerImage.fields.file.url
          })
        })

        feed.addCategory('Tech')
        feed.addCategory('Space')

        feed.addContributor({
          name: 'Shin Ando',
          email: 'shinglish11@gmail.com',
          link: 'https://blog.andoshin11.me/'
        })
      },
      cacheTime: 1000 * 60 * 60 * 6, // 6 hours
      type: 'atom1'
    }
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config) {
      configFile(config)
      return
    }
  }
}
