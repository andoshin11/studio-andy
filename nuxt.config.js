require('dotenv').config()
const pkg = require('./package')
const path = require('path')

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
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    title: 'Studio Andy',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: "Shin Ando's Blog | Studio Andy" },
      { hid: 'og:description', property: 'og:description', content: "Welcome to Shin Ando's (you may know me as Andy!) personal blog. I'm excited to share some parts of my daily life to all of you, my fellas." },
      { hid: 'og:url', property: 'og:url', content: 'https://blog.andoshin11.me' },
      { hid: 'og:image', property: 'og:image', content: 'https://blog.andoshin11.me/share.jpg' },
      { property: 'og:site_name', content: 'Studio Andy' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@andoshin11' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'apple-touch-icon', size: '60x60', href: '/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', size: '76x76', href: '/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', size: '120x120', href: '/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', size: '152x152', href: '/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', size: '180x180', href: '/apple-icon-180x180.png' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#da532c' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Merriweather'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=M+PLUS+1p'
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/reflect-metadata/0.1.13/Reflect.min.js'
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
  plugins: [{ src: '~/plugins/vue-lazyload', ssr: false }],

  /**
   * Server Middleware
   */
  serverMiddleware: ['~/middleware/cache'],

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

  icon: false,

  manifest: {
    short_name: 'Studio Andy',
    name: 'Studio Andy',
    icons: [
      {
        src: 'icon-72x72.png',
        sizes: '72x72',
        type: 'image/png'
      },
      {
        src: 'icon-96x96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: 'icon-128x128.png',
        sizes: '128x128',
        type: 'image/png'
      },
      {
        src: 'icon-144x144.png',
        sizes: '144x144',
        type: 'image/png'
      },
      {
        src: 'icon-152x152.png',
        sizes: '152x152',
        type: 'image/png'
      },
      {
        src: 'icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'icon-384x384.png',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: 'icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    background_color: '#ef6530',
    start_url: '/',
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
    dsn: process.env.SENTRY_DSN,
    publishRelease: process.env.NODE_ENV === 'production',
    disableClientRelease: false,
    disableServerSide: false,
    webpackConfig: {
      release: process.env.RELEASE_VERSION,
      urlPrefix: '~/_nuxt/'
    },
    config: {
      environment: process.env.NODE_ENV
    },
    serverConfig: {
      release: process.env.RELEASE_VERSION
    },
    clientConfig: {
      release: process.env.RELEASE_VERSION
    }
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
    useForkTsChecker: true,
    loaders: {
      vueStyle: {
        manualInject: true
      },
      css: {
        modules: true,
        importLoaders: 1,
        localIdentName: '[local]_[hash:base64:5]'
      }
    },
    babel: {
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
      ]
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, { isDev, isClient }) {
      if (!isDev) {
        if (isClient) {
          config.devtool = '#source-map'
        }

        // const SentryPlugin = require('@sentry/webpack-plugin')

        // config.plugins.push(
        //   new SentryPlugin({
        //     // Sentry options are required
        //     include: ['.nuxt/dist/client'],
        //     ignore: ['node_modules', '.nuxt/dist/client/img', '.nuxt/dist/client/icons'],
        //     configFile: '.sentryclirc',
        //     config: {
        //       environment: process.env.ENVIRONMENT || 'development'
        //     }
        //   })
        // )
      }

      return
    }
  }
}
