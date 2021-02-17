import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function(app) {
  const headers  = {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${process.env.REACT_APP_TWITTER_BEARLER_TOKEN}`,
  }
  app.use(createProxyMiddleware("/api/v1/",
  {
    target: "https://api.twitter.com/1.1/search/tweets.json",
    changeOrigin: true,
    secure: false,
    headers: headers
  }));
};