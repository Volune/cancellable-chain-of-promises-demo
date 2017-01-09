const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./wepack.config');

const DELAY = 1000; // ms

const webpackDevServerOptions = {
  publicPath: path.resolve(__dirname, 'assets'),
};

const app = express();
app.post('/echo', (req, res) => {
  let aborted = false;
  req.on('aborted', () => aborted = true);
  setTimeout(() => {
    if (!aborted) {
      req.pipe(res);
    }
  }, DELAY)
});
app.use(webpackDevMiddleware(webpack(webpackConfig), webpackDevServerOptions));
app.listen(5080);
