const { createProxyMiddleware } = require('http-proxy-middleware');

// Explicit dev proxy to avoid CORS and 404 from CRA when proxy string is ignored.
module.exports = function (app) {
  const target = 'http://3.13.116.236:8082';
  const common = {
    target,
    changeOrigin: true,
    secure: false,
    logLevel: 'info',
  };

  app.use('/api', createProxyMiddleware(common));
  app.use('/drivers', createProxyMiddleware(common));
  app.use('/riders', createProxyMiddleware(common));
  app.use('/roles', createProxyMiddleware(common));
};
