workbox.routing.registerRoute(
  new RegExp('^https://blog.andoshin11.me/$'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'page-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 14 // for 2 weeks
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('^https://cdn.contentful.com/spaces/2p1otbbee5vt/environments/master/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'entry-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 14 // for 2 weeks
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('^https://blog.andoshin11.me/(svg/.*.svg|.*.ico|.*.png)'),
  workbox.strategies.cacheFirst({
    cacheName: 'site-parts-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 30 // for 1 month
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('^https://images.ctfassets.net/2p1otbbee5vt/.*.(png|jpg|webp|gif)$'),
  workbox.strategies.cacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 14 // for 2 weeks
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('^https://i.gyazo.com/'),
  workbox.strategies.cacheFirst({
    cacheName: 'gyazo-mobile-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 14 // for 2 weeks
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('^https://gyazo.com/'),
  workbox.strategies.cacheFirst({
    cacheName: 'gyazo-pc-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 14 // for 2 weeks
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('^https://i-cdn.embed.ly/'),
  workbox.strategies.cacheFirst({
    cacheName: 'embedly-asset-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 14 // for 2 weeks
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('^https://api-cdn.embed.ly/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'embedly-api-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 14 // for 2 weeks
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('^https://cdn.embedly.com/widgets/platform.js'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'embedly-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 14 // for 2 weeks
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('^http://i-cdn.embed.ly/'),
  workbox.strategies.cacheFirst({
    cacheName: 'embedly-img-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 14 // for 2 weeks
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('^https://assets-cdn.github.com/favicon.ico'),
  workbox.strategies.cacheFirst({
    cacheName: 'github-icon-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 14 // for 2 weeks
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('^https://fonts.googleapis.com/'),
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 30 // for 1 month
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('^https://www.youtube.com/'),
  workbox.strategies.cacheFirst({
    cacheName: 'youtube-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 30 // for 1 month
      })
    ]
  })
)
