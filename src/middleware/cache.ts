// @ts-ignore
module.exports = function(_, res, next) {
  res.setHeader('Cache-Control', 'public, max-age=1800') // 60 * 30
  next()
}
