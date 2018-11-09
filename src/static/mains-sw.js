workbox.routing.registerRoute(
  new RegExp(
    '^https://cdn.contentful.com/spaces/2p1otbbee5vt/environments/master/'
  ),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'entry-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('^http://images.ctfassets.net/2p1otbbee5vt/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'image-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
)
