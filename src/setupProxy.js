const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://curved-organized-salesman.glitch.me',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove /api do caminho
      },
    })
  );
};

